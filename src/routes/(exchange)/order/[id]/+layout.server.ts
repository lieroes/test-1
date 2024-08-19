import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, params, url }) => {
	const order = await prisma.order.findUnique({
		where: { id: params?.id, userId: locals.user?.id }
	});
	if (!order) throw redirect(307, '/');

	const baseRedirectPath = `/order/${order.id}`;
	const destinations = [
		'verification', // 0
		'requisites', // 1
		'payment-method', // 2
		'payment', // 3
		'transfer', // 4
		'success', // 5
		'error' // 6
	];

	if (!url.pathname.includes(destinations[order.status])) {
		throw redirect(302, `${baseRedirectPath}/${destinations[order.status]}`);
	}

	return { order };
};
