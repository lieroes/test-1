import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { getSumsubAccessToken, getSumsubVerificationResult } from '$lib/server/sumsub';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

const identityFormSchema = z.object({});

export const load: PageServerLoad = async ({ locals, params }) => {
	const identityForm = await superValidate(identityFormSchema);
	const accessToken = await getSumsubAccessToken(params?.id, 'order-identity-verification', 600);

	return {
		identityForm,
		accessToken,
		user: locals.user
	};
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const form = await superValidate(request, identityFormSchema);
		if (!form.valid) return fail(400, { form });

		const order = await prisma.order.findUnique({
			where: { id: params?.id, userId: locals.user?.id }
		});
		if (!order) return fail(400, { form });

		await prisma.order.update({
			where: { id: params?.id, userId: locals.user?.id },
			data: { status: 1 }
		});

		await prisma.notification.create({
			data: {
				userId: locals.user.id,
				orderId: order.id,
				status: order.status + 1
			}
		});

		throw redirect(302, `/order/${params.id}`);
	}
};
