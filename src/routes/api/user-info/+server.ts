import prisma from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: locals.user.id },
            include: { UserInfo: true }
        });

        if (user) {
            const { firstName, lastName } = user.UserInfo;
            return json({ firstName, lastName });
        } else {
            return json({ error: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
