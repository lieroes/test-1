import prisma from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const reqJson = await request.json();

	const [user, order] = await Promise.all([
		prisma.user.findUnique({
			where: { id: reqJson.merchant.custom_data.userId }
		}),
		prisma.order.findUnique({
			where: { id: reqJson.merchant.custom_data.orderId }
		})
	]);

	if (!order || !user) return json({ status: 'error', message: 'Invalid user or order' });

	const paymentStatuses = {
		processing: 4,
		approved: 4,
		declined: 6,
		expired: 6
	};

	await prisma.order.update({
		where: { id: order.id, userId: user.id },
		data: { status: paymentStatuses[reqJson.status] || 6 }
	});

	return json({ success: true });
};
