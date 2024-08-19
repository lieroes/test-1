import type { PageServerLoad } from './$types';
import cryptoCurrencies from '$lib/json/crypto-currencies.json';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import prisma from '$lib/server/prisma';
import { NODE_ENV } from '$env/static/private';

const buyFormSchema = z.object({
	exchangeRate: z.number(),
	fromCurrency: z.string().min(1),
	toCurrency: z.string().min(1),
	fromAmount: z.number().min(5.0),
	toAmount: z.number(),
	serviceFee: z.number(),
	networkFee: z.number()
});

export const load: PageServerLoad = async ({ url, fetch }) => {
	const fromCurrency = url.searchParams.get('from') || 'USD';
	const toCurrency = url.searchParams.get('to') || 'BTC';
	const amount = url.searchParams.get('amount');

	const buyForm = await superValidate(buyFormSchema);
	buyForm.data.fromCurrency = fromCurrency;
	buyForm.data.toCurrency = toCurrency;

	const getExchangeRate = async () => {
		const exchangeRateReq = await fetch(
			`https://api.coinbase.com/v2/prices/${toCurrency.split(' ')[0]}-${
				fromCurrency.split(' ')[0]
			}/spot`
		);
		const { data } = await exchangeRateReq.json();

		return 1 / data.amount;
	};

	const getCoinsWithPrice = async () => {
		const coinPricesReq = await fetch(`https://api.coinpaprika.com/v1/tickers`, {
			cache: 'force-cache'
		});
		const data = await coinPricesReq.json();

		const coinsWithPrice = cryptoCurrencies.map((coin) => ({
			...coin,
			price: data.find((c: any) => c.id === coin.id)?.quotes.USD.price || 0
		}));

		return coinsWithPrice;
	};

	const getLatestTransactions = async () => {
		const transactions = await prisma.order.findMany({
			take: 10,
			orderBy: { createdAt: 'desc' }
		});

		return transactions;
	};

	return {
		buyForm,
		exchangeRate: getExchangeRate(),
		cryptoCurrencies: getCoinsWithPrice(),
		latestTransactions: getLatestTransactions(),
		fromCurrency,
		toCurrency,
		amount
	};
};

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
		const form = await superValidate(request, buyFormSchema);
		if (!form.valid) return fail(400, { form });

		const orderData = {
			exchangeType: 'fiat-crypto',
			exchangeRate: form.data.exchangeRate,
			fromCurrency: form.data.fromCurrency,
			fromAmount: form.data.fromAmount,
			toCurrency: form.data.toCurrency,
			toAmount: form.data.toAmount,
			serviceFee: form.data.serviceFee,
			networkFee: form.data.networkFee
		};

		if (!locals.user || locals.user.registrationStage !== 2) {
			cookies.set('pending_order', JSON.stringify(orderData), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7
			});

			throw redirect(302, '/sign-in');
		}

		const order = await prisma.order.create({
			data: { ...orderData, userId: locals.user.id }
		});

		await prisma.notification.create({
			data: {
				userId: locals.user.id,
				orderId: order.id,
				status: order.status
			}
		});

		throw redirect(302, `/order/${order.id}`);
	}
};
