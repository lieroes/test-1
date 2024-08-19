import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import prisma from '$lib/server/prisma';

const paymentMethodFormSchema = z
	.object({
		paymentMethod: z.string()
	})
	.refine(
		(data) =>
			data.paymentMethod === 'credit-card' ||
			data.paymentMethod === 'bank-transfer' ||
			data.paymentMethod === 'safe-card',
		{ path: ['paymentMethod'] }
	);

export const load: PageServerLoad = async ({ params, locals, parent }) => {
	console.log('Loading payment method form...');
	const paymentMethodForm = await superValidate(paymentMethodFormSchema);
	console.log('Payment method form loaded:', paymentMethodForm);
	return { paymentMethodForm };
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		console.log('Processing form submission...');
		const form = await superValidate(request, paymentMethodFormSchema);
		if (!form.valid) {
			console.log('Form validation failed:', form);
			return fail(400, { form });
		}
		console.log('Form validation succeeded:', form);

		// Check and adjust payment method if needed
		// if (form.data.paymentMethod === 'safe-card') {
		// 	form.data.paymentMethod = 'credit-card';
		// 	console.log('Payment method changed from safe-card to credit-card');
		// }

		try {
			const updatedOrder = await prisma.order.update({
				where: {
					id: params?.id,
					userId: locals.user?.id
				},
				data: {
					paymentMethod: form.data.paymentMethod,
					status: 3
				}
			});
			console.log('Order updated successfully:', updatedOrder);
		} catch (error) {
			console.error('Error updating order:', error);
			return fail(500, { error: 'Error updating order' });
		}

		console.log('Redirecting to order page...');
		throw redirect(302, `/order/${params.id}`);
	}
};
