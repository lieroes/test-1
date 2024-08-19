import prisma from '$lib/server/prisma';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const updateProfileFormSchema = z
	.object({
		firstName: z.string().min(2),
		lastName: z.string().min(2),
		password: z.string().min(8).optional(),
		passwordConfirm: z.string().optional()
	})
	.refine(
		(data) =>
			data.password === data.passwordConfirm && data.password !== '' && data.passwordConfirm !== '',
		{ path: ['passwordConfirm'] }
	);

export const load: PageServerLoad = async ({ locals }) => {
	const updateProfileForm = await superValidate(updateProfileFormSchema);

	const getUserInfo = async () => {
		const userData = await prisma.user.findUnique({
			where: {
				id: locals.user.id
			},
			include: {
				UserInfo: {
					select: {
						firstName: true,
						lastName: true
					}
				}
			}
		});

		updateProfileForm.data.firstName = userData?.UserInfo?.firstName || '';
		updateProfileForm.data.lastName = userData?.UserInfo?.lastName || '';

		return userData?.UserInfo;
	};

	return { userInfo: getUserInfo(), updateProfileForm };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, updateProfileFormSchema);
		if (!form.valid) return fail(400, { form });

		let passwordHash = null;

		if (form.data.password) {
			passwordHash = await bcrypt.hash(form.data.password, 10);
		}

		await prisma.user.update({
			where: {
				id: locals.user.id
			},
			data: {
				...(passwordHash ? { passwordHash } : {}),
				UserInfo: {
					update: { firstName: form.data.firstName, lastName: form.data.lastName }
				}
			}
		});
	}
};
