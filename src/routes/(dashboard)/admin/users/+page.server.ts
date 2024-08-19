import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const replenishmentPage = Number(url.searchParams.get('page')) || 0;
	const searchQuery = url.searchParams.get('q') || null;

	const getUsers = async () => {
		const users = await prisma.user.findMany({
			where: {
				registrationStage: 2,
				...(searchQuery
					? {
							OR: [
								{ id: { contains: searchQuery, mode: 'insensitive' } },
								{ email: { contains: searchQuery, mode: 'insensitive' } },
								{ phone: { contains: searchQuery, mode: 'insensitive' } },
								{ UserInfo: { firstName: { contains: searchQuery, mode: 'insensitive' } } },
								{ UserInfo: { lastName: { contains: searchQuery, mode: 'insensitive' } } }
							]
					  }
					: {})
			},
			include: {
				UserInfo: true
			},
			take: 10,
			skip: replenishmentPage * 10,
			orderBy: { createdAt: 'desc' }
		});

		return users;
	};

	const getUsersCount = async () => {
		const items = await prisma.user.count({
			where: {
				registrationStage: 2,
				...(searchQuery
					? {
							OR: [{ id: { contains: searchQuery, mode: 'insensitive' } }]
					  }
					: {})
			}
		});
		return items;
	};

	return {
		users: getUsers(),
		usersCount: getUsersCount()
	};
};
