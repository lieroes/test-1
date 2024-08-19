import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import prisma from '$lib/server/prisma';

const receiverFormSchema = z.object({
	receiver: z.string().min(15)
});

export const load: PageServerLoad = async ({ parent }) => {
	const receiverForm = await superValidate(receiverFormSchema);
	return { receiverForm };
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const form = await superValidate(request, receiverFormSchema);
		if (!form.valid) return fail(400, { form });

		const order = await prisma.order.findUnique({
			where: {
				id: params?.id,
				userId: locals.user?.id
			}
		});

		if (!order) return fail(400, { form });

		await prisma.order.update({
			where: {
				id: params?.id,
				userId: locals.user?.id
			},

			data:
				order.exchangeType === 'fiat-crypto'
					? { receiver: form.data.receiver, status: 2 }
					: { receiver: form.data.receiver, status: 3, paymentMethod: 'crypto' }
		});

		throw redirect(302, `/order/${params.id}`);
	}
};
