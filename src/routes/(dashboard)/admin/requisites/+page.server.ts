import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import CryptoCurrencies from '$lib/json/crypto-currencies.json';
import { fail, type Actions } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

const bankRequisitesFormSchema = z.object({
	id: z.string().uuid(),
	cardNumber: z.string(),
	iban: z.string(),
	swift: z.string(),
	beneficiary: z.string(),
	registrationNumber: z.string(),
	beneficiaryAddress: z.string(),
	bankName: z.string()
});

let schemaObject = {};
CryptoCurrencies.forEach((currency) => {
	schemaObject[currency.ticker] = z.string().regex(new RegExp(currency.addressRegex)).optional();
});

const cryptoRequisitesFormSchema = z.object(schemaObject);

export const load: PageServerLoad = async () => {
	let bankRequisites = await prisma.bankRequisites.findFirst();
	if (!bankRequisites) {
		bankRequisites = await prisma.bankRequisites.create({ data: {} });
	}

	let cryptoRequisites = await prisma.cryptoRequisite.findMany();
	if (cryptoRequisites.length === 0) {
		console.log('Creating crypto');
		cryptoRequisites = await prisma.cryptoRequisite.createMany({
			data: CryptoCurrencies.map((currency) => ({ ticker: currency.ticker }))
		});
	}

	const bankRequisitesForm = await superValidate(bankRequisitesFormSchema);
	bankRequisitesForm.data = bankRequisites;

	const cryptoRequisitesForm = await superValidate(cryptoRequisitesFormSchema);
	cryptoRequisitesForm.data = cryptoRequisites.reduce((acc, crypto) => {
		acc[crypto.ticker] = crypto.address || '';
		return acc;
	}, {});

	return { bankRequisitesForm, cryptoRequisitesForm };
};

export const actions: Actions = {
	setBankRequisites: async ({ request, locals }) => {
		const form = await superValidate(request, bankRequisitesFormSchema);
		if (!form.valid) return fail(400, { form });

		await prisma.bankRequisites.update({
			where: { id: form.data.id },
			data: {
				cardNumber: form.data.cardNumber,
				iban: form.data.iban,
				swift: form.data.swift,
				beneficiary: form.data.beneficiary,
				registrationNumber: form.data.registrationNumber,
				beneficiaryAddress: form.data.beneficiaryAddress,
				bankName: form.data.bankName
			}
		});
	},
	setCryptoRequisites: async ({ request }) => {
		const form = await superValidate(request, cryptoRequisitesFormSchema);
		if (!form.valid) return fail(400, { form });

		for (const item of Object.keys(form.data)) {
			await prisma.cryptoRequisite.update({
				where: { ticker: item },
				data: {
					address: form.data[item] ? form.data[item] : ''
				}
			});
		}
	}
};
