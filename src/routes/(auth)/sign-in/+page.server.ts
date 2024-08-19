import prisma from '$lib/server/prisma';
import { fail, type Actions, type ServerLoad, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { generateUserAuthToken } from '$lib/server/utils';
import { NODE_ENV } from '$env/static/private';

const signInFormSchema = z.object({
	email: z.string().email('Неверный формат e-mail'),
	password: z.string().min(8, 'Пароль слишком короткий')
});

export const load: ServerLoad = async ({ locals }) => {
	if (locals.user?.registrationStage === 2 && locals.user?.email && locals.user?.phone) {
		throw redirect(302, '/member/settings');
	}

	const signInForm = await superValidate(signInFormSchema);
	return { signInForm: signInForm };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, signInFormSchema);
		if (!form.valid) return fail(400, { signInForm: form });

		const user = await prisma.user.findUnique({ where: { email: form.data.email } });
		if (!user || !user.email || !user.passwordHash) {
			console.log('User not found or invalid email/password');
			return message(form, 'InvalidEmailOrPassword', {
				status: 400
			});
		}

		const isPasswordValid = await bcrypt.compare(form.data.password, user.passwordHash);
		if (!isPasswordValid) {
			console.log('Invalid password');
			return message(form, 'InvalidEmailOrPassword', {
				status: 400
			});
		}

		const userAuthToken = generateUserAuthToken();
		const newUser = await prisma.user.update({
			where: { email: user.email },
			data: { userAuthToken }
		});

		cookies.set('user_session', userAuthToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		});

		const pendingOrder = cookies.get('pending_order');
		if (pendingOrder) {
			const orderData = JSON.parse(pendingOrder);
			const order = await prisma.order.create({
				data: { ...orderData, userId: newUser.id }
			});

			cookies.delete('pending_order');

			throw redirect(302, `/order/${order.id}`);
		}

		throw redirect(302, '/member/settings');
	}
};
