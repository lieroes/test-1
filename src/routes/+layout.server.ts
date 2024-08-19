import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals, url, fetch }) => {
	let langCode = cookies.get('language') || 'en';
	let cookiePolicyAccepted = !!cookies.get('cookie_accepted') || false;
	
	const userIp = cookies.get('user_ip');

	const loadLangTexts = async () => {
		const langFile = await fetch(`/languages/${langCode}.json`, { cache: 'force-cache' });
		const langTexts = await langFile.json();

		return langTexts;
	};

	return {
		langCode,
		cookiePolicyAccepted,
		langTexts: loadLangTexts(),
		user: locals.user,
		userIp
	};
};
