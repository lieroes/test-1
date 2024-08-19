import prisma from '$lib/server/prisma';
import { generateUserAuthToken } from '$lib/server/utils';
import { type ServerLoad, redirect } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';

export const load: ServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) {
		const userAuthToken = generateUserAuthToken();
		await prisma.user.create({ data: { userAuthToken } });

		cookies.set('user_session', userAuthToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		});

		throw redirect(302, '/sign-up/identity');
	} else if (locals.user.registrationStage === 0) throw redirect(302, '/sign-up/identity');
	else if (locals.user.registrationStage === 1) throw redirect(302, '/sign-up/password');
	else if (locals.user.registrationStage === 2) throw redirect(302, '/member/settings');
};
