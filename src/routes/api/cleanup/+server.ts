import prisma from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	// Set a time span
	const twentyFourHoursAgo = new Date();
	twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

	// Find old inactive orders and remove them from the database
	const oldOrders = await prisma.order.findMany({
		where: {
			createdAt: { lt: twentyFourHoursAgo },
			status: { lt: 4 }
		},
		select: { id: true }
	});

	const orderIds = oldOrders.map((order) => order.id);
	const deletedOrders = await prisma.order.deleteMany({
		where: { id: { in: orderIds } }
	});

	// Find old inactive users and remove them from the database
	const oldUsers = await prisma.user.findMany({
		where: {
			createdAt: { lt: twentyFourHoursAgo },
			registrationStage: { equals: 0 },
			role: 'USER'
		},
		select: { id: true }
	});

	const userIds = oldUsers.map((user) => user.id);
	const deletedUsers = await prisma.user.deleteMany({
		where: { id: { in: userIds } }
	});

	return json({
		orders: deletedOrders.count,
		users: deletedUsers.count
	});
};
