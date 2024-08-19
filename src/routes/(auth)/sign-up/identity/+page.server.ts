import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { getSumsubAccessToken, getSumsubVerificationResult } from '$lib/server/sumsub';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

const identityFormSchema = z.object({});

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const identityForm = await superValidate(identityFormSchema);
	const accessToken = await getSumsubAccessToken(locals.user.id, 'sumsub-signin-demo-level', 600);

	return {
		identityForm,
		accessToken,
		user: locals.user
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, identityFormSchema);
		if (!form.valid) return fail(400, { form });

		if (locals.user.email && locals.user.phone) {
			throw redirect(301, '/sign-up/password');
		}

		const verificationResult = await getSumsubVerificationResult(locals.user.id);

		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ email: verificationResult.email }, { phone: verificationResult.phone }]
			}
		});

		if (existingUser) {
			throw redirect(301, '/sign-up/error');
		}

		await prisma.user.update({
			where: { id: locals.user.id },
			data: {
				email: verificationResult.email,
				phone: verificationResult.phone,
				registrationStage: 1,
				UserInfo: {
					create: {
						firstName: verificationResult.fixedInfo.firstNameEn,
						lastName: verificationResult.fixedInfo.lastNameEn,
						dateOfBirth: verificationResult.fixedInfo.dob,
						gender: verificationResult.fixedInfo.gender,
						countryCode: verificationResult.fixedInfo.country,
						state: verificationResult.fixedInfo.addresses[0].stateEn,
						town: verificationResult.fixedInfo.addresses[0].townEn,
						street: verificationResult.fixedInfo.addresses[0].streetEn,
						postCode: verificationResult.fixedInfo.addresses[0].postCode,
						formattedAddress: verificationResult.fixedInfo.addresses[0].formattedAddress
					}
				}
			}
		});

		throw redirect(301, '/sign-up/password');
	}
};
