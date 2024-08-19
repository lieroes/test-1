// src/routes/submit-feedback.js
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    console.log('Received request');

    try {
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');
        const phone = data.get('phone');
        const message = data.get('message');

        console.log('Form Data:', { name, email, phone, message });

        // Define the type for the errors object
        const errors: Record<string, boolean> = {};

        if (!name) errors.name = true;
        if (!email) errors.email = true;
        if (!phone) errors.phone = true;
        if (!message) errors.message = true;

        console.log('Validation Errors:', errors);

        if (Object.keys(errors).length > 0) {
            console.log('Returning validation errors');
            return json({ errors }, { status: 400 });
        }

        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_BOT_CHAT_ID = process.env.TELEGRAM_BOT_CHAT_ID;

        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_BOT_CHAT_ID) {
            console.error('Telegram bot token or chat ID not found in environment variables');
            return json({ error: 'Server configuration error' }, { status: 500 });
        }

        const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;

        console.log('Sending message to Telegram:', text);

        const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_BOT_CHAT_ID,
                text
            })
        });

        if (!telegramResponse.ok) {
            const errorText = await telegramResponse.text();
            console.error('Telegram API response error:', errorText);
            return json({ error: 'Failed to send message to Telegram' }, { status: 500 });
        }

        console.log('Message sent successfully');
        return json({ success: true });

    } catch (error) {
        console.error('Unexpected error:', error);
        return json({ error: 'Server error' }, { status: 500 });
    }
}
