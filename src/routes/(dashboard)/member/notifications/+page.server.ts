import prisma from '$lib/server/prisma';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const currentPage = Number(url.searchParams.get('page')) || 0;

	const getNotifications = async () => {
		const notifications = await prisma.notification.findMany({
			where: {
				userId: locals.user.id
			},
			include: {
				order: {
					select: {
						id: true
					}
				}
			},
			take: 15,
			skip: currentPage * 15,
			orderBy: { createdAt: 'desc' }
		});

		return notifications;
	};

	const getNotificationsCount = async () => {
		const items = await prisma.notification.count({
			where: {
				userId: locals.user.id
			}
		});
		return items;
	};

	return { notifications: getNotifications(), notificationsCount: getNotificationsCount() };
};
