import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from '../$types';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { sendNotification } from '$lib/server/telegram';

const confirmFormSchema = z.object({});

export const load: PageServerLoad = async ({ params, locals }) => {
	try {
		console.log('Loading order data...');
		const order = await prisma.order.findUnique({
			where: { id: params?.id, userId: locals.user?.id }
		});
		if (!order) {
			console.log('Order not found, redirecting...');
			throw redirect(302, '/');
		}
		console.log('Order found:', order);

		let fiatRequisites = null;
		let cryptoRequisites = null;

		if (order.exchangeType === 'fiat-crypto') {
			fiatRequisites = await prisma.bankRequisites.findFirst();
			console.log('Fiat requisites found:', fiatRequisites);
		} else {
			cryptoRequisites = await prisma.cryptoRequisite.findUnique({
				where: { ticker: order.fromCurrency }
			});
			console.log('Crypto requisites found:', cryptoRequisites);
		}

		const confirmForm = await superValidate(confirmFormSchema);
		console.log('Form validation complete:', confirmForm);

		return { confirmForm, fiatRequisites, cryptoRequisites };
	} catch (error) {
		console.error('Error in load function:', error);
		throw error;
	}
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		try {
			console.log('Processing form submission...');
			const form = await superValidate(request, confirmFormSchema);
			if (!form.valid) {
				console.log('Form validation failed:', form);
				return fail(400, { form });
			}
			console.log('Form validation succeeded:', form);

			const order = await prisma.order.update({
				where: { id: params?.id, userId: locals.user?.id },
				data: { status: 4 }
			});
			console.log('Order status updated:', order);

			try {
				await sendNotification({
					id: order.id,
					paymentMethod: order.paymentMethod || 'not-specified',
					receiver: order.receiver || 'Не указан',
					fromCurrency: order.fromCurrency,
					fromAmount: order.fromAmount,
					toCurrency: order.toCurrency,
					toAmount: order.toAmount
				});
				console.log('Notification sent successfully');
			} catch (error) {
				console.error('Failed to send notification:', error);
			}

			console.log('Redirecting to order page...');
			throw redirect(300, `/order/${params.id}`);
		} catch (error) {
			console.error('Error in action function:', error);
			throw error;
		}
	}
};
