import {
    FYST_API_BASE,
    FYST_CALLBACK_URL_BASE,
    FYST_CONTROL_KEY,
    FYST_MERCHANT_ID
} from '$env/static/private';
import { iso3toIso2 } from '$lib/constant';
import prisma from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import crypto from 'crypto';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const reqJson = await request.json();
        console.log('Parsed JSON:', reqJson);

        const [user, order] = await Promise.all([
            prisma.user.findUnique({
                where: { id: reqJson.userId },
                include: { UserInfo: true }
            }),
            prisma.order.findUnique({
                where: { id: reqJson.orderId },
                include: { paySafeCardDetails: true }
            })
        ]);

        console.log('Fetched user:', user);
        console.log('Fetched order:', order);

        if (order?.paySafeCardDetails) {
            const paymentDetails = await getPayment(order.paySafeCardDetails);
            console.log('Payment details:', paymentDetails);
            return json({ paymentUrl: paymentDetails?.redirect_to || null }, { status: 200 });
        } else {
            const payment = await createPayment(reqJson, user, order);
            console.log('Created payment:', payment);

            if (!payment || !payment.redirect_to) {
                console.error('Payment creation failed or returned invalid data:', payment);
                return json({ error: true, paymentUrl: null }, { status: 500 });
            }

            console.log('Payment details after creation:', payment);

            return json({ paymentUrl: payment.redirect_to }, { status: 200 });
        }
    } catch (error) {
        console.error('Error in POST handler:', error);
        return json({ error: true, paymentUrl: null }, { status: 500 });
    }
};

function recursiveSortAndClean(input: any) {
    if (Array.isArray(input)) {
        return input.map(recursiveSortAndClean);
    } else if (typeof input === 'object' && input !== null) {
        let sorted: any = {};
        Object.keys(input)
            .sort()
            .forEach((key) => {
                const cleanedValue = recursiveSortAndClean(input[key]);
                if (cleanedValue !== '') {
                    sorted[key] = cleanedValue;
                }
            });

        return sorted;
    } else if (typeof input === 'string') {
        return input.trim();
    }

    return input;
}

function generateSHA1(input: string): string {
    return crypto.createHash('sha1').update(Buffer.from(input, 'utf-8')).digest('hex');
}

interface PaymentRequestBody {
    client_orderid: string;
    order_desc: string;
    first_name: string;
    last_name: string;
    ssn: string;
    birthday: string;
    address1: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    phone: string;
    cell_phone: string;
    amount: string;
    email: string;
    currency: string;
    ipaddress: string;
    site_url: string;
    purpose: string;
    redirect_url: string;
    server_callback_url: string;
    merchant_data: string;
    control?: string;
}

const createPayment = async (reqJson: any, user: any, order: any) => {
    try {
        const amountInCents = (parseFloat(order.fromAmount) * 100).toFixed(0);
        const body: PaymentRequestBody = {
            client_orderid: order.id,
            order_desc: 'Test Order Description',
            first_name: 'John',
            last_name: 'Smith',
            ssn: '1267',
            birthday: '19820115',
            address1: '100 Main st',
            city: 'Seattle',
            state: 'WA',
            zip_code: '98102',
            country: 'US',
            phone: '+12063582043',
            cell_phone: '+19023384543',
            amount: parseFloat(order.fromAmount).toFixed(0),
            email: 'john.smith@gmail.com',
            currency: order.fromCurrency,
            ipaddress: reqJson.ip_address,
            site_url: 'www.google.com',
            purpose: 'user_account1',
            redirect_url: 'https://doc.fyst.com/doc/dummy.htm',
            server_callback_url: 'https://httpstat.us/200',
            merchant_data: 'VIP customer'
        };

        const controlString = `${FYST_MERCHANT_ID}${body.client_orderid}${amountInCents}${body.email}${FYST_CONTROL_KEY}`;
        body.control = generateSHA1(controlString);

        console.log('Control string:', controlString);
        console.log('Control SHA1:', body.control);

        console.log('Payment request body:', body);

        let sortedAndCleanedBody = recursiveSortAndClean(body);
        let bodyString = new URLSearchParams(sortedAndCleanedBody).toString();

        console.log('Sorted and cleaned body:', bodyString);

        const res = await fetch(`${FYST_API_BASE}/${FYST_MERCHANT_ID}`, {
            method: 'POST',
            body: bodyString,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const text = await res.text();
        console.log('Raw response from payment creation:', text);

        const redirectUrlMatch = text.match(/redirect-url=([^&]*)/);
        const redirectUrl = redirectUrlMatch ? decodeURIComponent(redirectUrlMatch[1]) : null;

        if (!redirectUrl) {
            console.error('Error extracting redirect URL:', text);
            return null;
        }

        console.log('Parsed redirect URL from payment creation:', redirectUrl);
        return { redirect_to: redirectUrl };
    } catch (error) {
        console.error('Error in createPayment:', error);
        return null;
    }
};

const getPayment = async (paymentDetails: any) => {
    try {
        const body = {
            merchant_id: parseInt(FYST_MERCHANT_ID),
            order_id: paymentDetails.gatewayOrderId,
            operation_id: paymentDetails.gatewayOperationId
        };

        console.log('Payment status request body:', body);

        let sortedAndCleanedBody = recursiveSortAndClean(body);
        let bodyString = new URLSearchParams(sortedAndCleanedBody).toString();

        console.log('Sorted and cleaned body for status:', bodyString);

        for (let i = 0; i < 5; i++) {
            await new Promise((r) => setTimeout(r, 1000 * i));

            const res = await fetch(`${FYST_API_BASE}/status`, {
                method: 'POST',
                body: bodyString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            const resData = await res.json();
            console.log('Response from payment status check:', resData);

            if (resData.redirect_to) {
                return resData;
            }
        }

        return null;
    } catch (error) {
        console.error('Error in getPayment:', error);
        return null;
    }
};
