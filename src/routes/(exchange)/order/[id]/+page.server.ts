import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { order } = await parent();

	const baseRedirectPath = `/order/${order.id}`;
	const destinations = [
		'wallet', // 0
		'payment-method', // 1
		'payment', // 2
		'verification', // 3
		'transfer', // 4
		'success', // 5
		'error' // 6
	];

	throw redirect(302, `${baseRedirectPath}/${destinations[order.status]}`);
};
