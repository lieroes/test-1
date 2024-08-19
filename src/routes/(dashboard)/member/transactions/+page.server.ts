import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const replenishmentPage = Number(url.searchParams.get('page')) || 0;
	const searchQuery = url.searchParams.get('q') || null;

	const getUserOrders = async () => {
		const orders = await prisma.order.findMany({
			where: {
				userId: locals.user.id,
				...(searchQuery
					? {
							OR: [
								{ id: { contains: searchQuery, mode: 'insensitive' } },
								{ fromCurrency: { contains: searchQuery, mode: 'insensitive' } },
								{ fromCurrency: { contains: searchQuery, mode: 'insensitive' } },
								{ toCurrency: { contains: searchQuery, mode: 'insensitive' } }
							]
					  }
					: {})
			},
			take: 10,
			skip: replenishmentPage * 10,
			orderBy: { createdAt: 'desc' }
		});

		return orders;
	};

	const getUserOrdersCount = async () => {
		const items = await prisma.order.count({
			where: {
				userId: locals.user.id,
				...(searchQuery
					? {
							OR: [
								{ id: { contains: searchQuery, mode: 'insensitive' } },
								{ fromCurrency: { contains: searchQuery, mode: 'insensitive' } },
								{ fromCurrency: { contains: searchQuery, mode: 'insensitive' } },
								{ toCurrency: { contains: searchQuery, mode: 'insensitive' } }
							]
					  }
					: {})
			}
		});
		return items;
	};

	return {
		orders: getUserOrders(),
		ordersCount: getUserOrdersCount()
	};
};
