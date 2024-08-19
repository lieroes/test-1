import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const userDetailsSchema = z.object({
	role: z.string(),
	email: z.string(),
	phone: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	gender: z.string(),
	dateOfBirth: z.string(),
	countryCode: z.string(),
	town: z.string(),
	street: z.string(),
	formattedAddress: z.string(),
	password: z.string().min(8).optional(),
	passwordConfirm: z.string().optional()
});

export const load: PageServerLoad = async ({ params }) => {
	const userDetailsForm = await superValidate(userDetailsSchema);

	const getUserData = async () => {
		const user = await prisma.user.findUnique({
			where: { id: params?.id },
			include: { UserInfo: true, orders: { take: 10 } }
		});

		userDetailsForm.data = {
			role: user.role,
			email: user.email,
			phone: user.phone,
			firstName: user.UserInfo.firstName,
			lastName: user.UserInfo.lastName,
			gender: user.UserInfo.gender,
			dateOfBirth: user.UserInfo.dateOfBirth,
			countryCode: user.UserInfo.countryCode,
			town: user.UserInfo.town,
			street: user.UserInfo.street,
			formattedAddress: user.UserInfo.formattedAddress
		};

		return user;
	};

	return {
		userData: getUserData(),
		userDetailsForm
	};
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const form = await superValidate(request, userDetailsSchema);
		if (!form.valid) return fail(400, { form });

		console.log(form);

		let passwordHash = null;

		if (form.data.password) {
			passwordHash = await bcrypt.hash(form.data.password, 10);
		}

		await prisma.user.update({
			where: {
				id: params?.id
			},
			data: {
				...(passwordHash ? { passwordHash } : {}),
				role: form.data.role,
				email: form.data.email,
				phone: form.data.phone,
				UserInfo: {
					update: {
						firstName: form.data.firstName,
						lastName: form.data.lastName,
						gender: form.data.gender,
						dateOfBirth: form.data.dateOfBirth,
						countryCode: form.data.countryCode,
						town: form.data.town,
						street: form.data.street,
						formattedAddress: form.data.formattedAddress
					}
				}
			}
		});

		throw redirect(302, '/admin/users');
	}
};
