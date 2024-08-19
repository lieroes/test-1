import prisma from '$lib/server/prisma';
import { fail, type Actions, type ServerLoad, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const passwordFormSchema = z
	.object({
		password: z.string().min(8),
		passwordConfirm: z.string()
	})
	.refine(
		(data) =>
			data.password === data.passwordConfirm && data.password !== '' && data.passwordConfirm !== '',
		{ path: ['passwordConfirm'] }
	);

export const load: ServerLoad = async ({ url }) => {
	const passwordForm = await superValidate(passwordFormSchema);
	return { passwordForm };
};

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
		const form = await superValidate(request, passwordFormSchema);
		if (!form.valid) return fail(400, { form });

		const passwordHash = await bcrypt.hash(form.data.password, 10);

		const user = await prisma.user.update({
			where: {
				id: locals.user.id
			},
			data: {
				passwordHash,
				registrationStage: 2
			}
		});

		const pendingOrder = cookies.get('pending_order');
		if (pendingOrder) {
			const orderData = JSON.parse(pendingOrder);
			const order = await prisma.order.create({
				data: { ...orderData, userId: user.id }
			});

			cookies.delete("pending_order")

			throw redirect(302, `/order/${order.id}`);
		}

		throw redirect(301, '/member/settings');
	}
};
