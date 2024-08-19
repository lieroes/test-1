import { fail, type Actions, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';

const languageFormSchema = z.object({
	language: z.string().default('en')
});

export const load: PageServerLoad = async () => {
	throw redirect(302, '/buy');
};

export const actions: Actions = {
	setLang: async ({ request, cookies }) => {
		const form = await superValidate(request, languageFormSchema);
		if (!form.valid) return fail(400, { form });

		cookies.set('language', form.data.language);
	},
	signOut: async ({ cookies }) => {
		cookies.set('user_session', '', {
			path: '/',
			expires: new Date(0)
		});

		throw redirect(302, '/');
	},
	acceptCookiePolicy: async ({ cookies }) => {
		cookies.set('cookie_accepted', 'true');
	}
};
