import { NODE_ENV } from '$env/static/private';
import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export let requestIp: string;

export const handle = async ({ event, resolve }) => {
	const cookieIpAddress = event.cookies.get('user_ip');
	const cookieCountryCode = event.cookies.get('user_country');

	const requestIp =
		NODE_ENV === 'production' ? event.getClientAddress() || '0.0.0.0' : '178.158.195.116';

	if (
		!cookieCountryCode ||
		!cookieIpAddress ||
		(cookieIpAddress !== requestIp && !event.url.pathname.startsWith('/api'))
	) {
		const userGeolocationReq = await event.fetch(
			`http://ip-api.com/json/${requestIp}?fields=countryCode`
		);
		const userGeolocationData = await userGeolocationReq.json();

		event.cookies.set('user_ip', requestIp, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 100
		});
		event.cookies.set('user_country', userGeolocationData?.countryCode || 'US', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 100
		});
	}

	const cookieSession = event.cookies.get('user_session');
	if (cookieSession) {
		const user = await prisma.user.findUnique({
			where: { userAuthToken: cookieSession },
			select: {
				id: true,
				email: true,
				phone: true,
				registrationStage: true,
				role: true
			}
		});

		if (!user) {
			event.cookies.delete('user_session');
		}

		event.locals.user = { ...user };
	}

	if (event.url.pathname.startsWith('/member') && !event.locals.user) {
		throw redirect(303, '/sign-in');
	}

	if (event.url.pathname.startsWith('/admin') && !event.locals.user) {
		throw redirect(303, '/sign-in');
	}

	if (event.url.pathname.startsWith('/admin') && event.locals.user.role !== 'ADMIN') {
		throw redirect(303, '/');
	}

	if (
		event.url.pathname.startsWith('/sign-in') &&
		event.locals.user &&
		event.locals.user.registrationStage === 2
	) {
		throw redirect(303, '/');
	}

	if (
		event.url.pathname.startsWith('/sign-up') &&
		event.locals.user &&
		event.locals.user.registrationStage === 2
	) {
		throw redirect(303, '/');
	}

	if (
		event.url.pathname.startsWith('/sign-up/password') &&
		event.locals.user &&
		event.locals.user.registrationStage !== 1
	) {
		throw redirect(303, '/sign-up');
	}

	return resolve(event);
};
