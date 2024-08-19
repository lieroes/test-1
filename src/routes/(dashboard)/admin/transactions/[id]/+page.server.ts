import prisma from '$lib/server/prisma';
import { redirect, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const orderDetailsSchema = z.object({
	fromAmount: z.number(),
	toAmount: z.number(),
	serviceFee: z.number(),
	networkFee: z.number(),
	receiver: z.string(),
	exchangeRate: z.number(),
	status: z.number()
});

export const load: PageServerLoad = async ({ locals, params }) => {
	const orderDetailsForm = await superValidate(orderDetailsSchema);

	const getOrderData = async () => {
		const order = await prisma.order.findUnique({
			where: { id: params?.id }
		});

		if (!order) throw redirect(302, '/admin/transactions');

		orderDetailsForm.data = {
			fromAmount: order.fromAmount,
			toAmount: order.toAmount,
			serviceFee: order.serviceFee,
			networkFee: order.networkFee,
			receiver: order?.receiver || 'Receiver requisites are not set',
			exchangeRate: order.exchangeRate,
			status: order.status
		};

		return order;
	};

	return {
		orderDetailsForm,
		order: getOrderData()
	};
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const form = await superValidate(request, orderDetailsSchema);
		if (!form.valid) return fail(400, { form });

		const initialOrder = await prisma.order.findUnique({
			where: { id: params?.id },
			select: { status: true }
		});

		const order = await prisma.order.update({
			where: {
				id: params?.id
			},
			data: {
				fromAmount: form.data.fromAmount,
				toAmount: form.data.toAmount,
				serviceFee: form.data.serviceFee,
				networkFee: form.data.networkFee,
				receiver:
					form.data.receiver === 'Receiver requisites are not set' ? '' : form.data.receiver,
				exchangeRate: form.data.exchangeRate,
				status: form.data.status
			}
		});

		if (initialOrder.status !== order.status) {
			await prisma.notification.create({
				data: {
					userId: order.userId,
					orderId: order.id,
					status: order.status
				}
			});
		}

		throw redirect(302, '/admin/transactions');
	}
};
