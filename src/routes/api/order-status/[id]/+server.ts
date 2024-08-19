import prisma from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, params }) => {
	const order = await prisma.order.findUnique({
		where: { id: params.id },
		select: { status: true }
	});

	return json({ ...order });
};
