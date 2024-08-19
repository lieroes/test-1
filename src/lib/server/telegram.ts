import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_BOT_CHAT_ID } from '$env/static/private';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

type OrderMessage = {
	id: string;
	paymentMethod: 'bank-transfer' | 'credit-card' | 'crypto' | 'not-specified';
	receiver: string;
	fromCurrency: string;
	fromAmount: number;
	toCurrency: string;
	toAmount: number;
};

const paymentMethodName = {
	'not-specified': 'Не указан',
	'bank-transfer': 'Банковский перевод',
	'credit-card': 'Оплата картой',
	crypto: 'Криптовалюта'
};

export const sendNotification = async (order: OrderMessage) => {
	const message = `❕Новая заявка на обмен:\n\n#️⃣ ID: <code>${order.id}</code>\n🏦 Тип оплаты: ${
		paymentMethodName[order.paymentMethod]
	}\n\n💱 Обмен:\n<b>${order.fromAmount} ${order.fromCurrency} => ${order.toAmount} ${
		order.toCurrency
	}</b>\n\n👝 Реквизиты пользователя:\n<code>${order.receiver}</code>`;
	await bot.sendMessage(TELEGRAM_BOT_CHAT_ID, message, {
		parse_mode: 'HTML'
	});
};
