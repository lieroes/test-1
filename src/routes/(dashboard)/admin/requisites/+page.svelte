<script lang="ts">
	import CryptoCurrencies from '$lib/json/crypto-currencies.json';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	const {
		form: bankRequisitesForm,
		errors: bankRequisitesErrors,
		submitting: bankRequisitesSubmitting,
		enhance: bankRequisitesEnhance
	} = superForm(data.bankRequisitesForm);

	const {
		form: cryptoRequisitesForm,
		errors: cryptoRequisitesErrors,
		submitting: cryptoRequisitesSubmitting,
		enhance: cryptoRequisitesEnhance
	} = superForm(data.cryptoRequisitesForm);

	$: textContent = $page.data.langTexts.pages.adminRequisites;
</script>

<svelte:head>
	<title>{textContent.meta.title}</title>
</svelte:head>

<div class="requisites-container">
	<form action="?/setBankRequisites" method="post" use:bankRequisitesEnhance>
		<h2 class="requisites-title">{textContent.bankRequisitesTitle}</h2>
		<div class="requisites-grid">
			<input type="hidden" class="form-input__input" name="id" value={$bankRequisitesForm.id} />
			<div class="form-input__wrapper">
				<label class="form-input__label">{textContent.card}</label>
				<input class="form-input__input" name="cardNumber" value={$bankRequisitesForm.cardNumber} />
			</div>
			<div class="form-input__wrapper">
				<label class="form-input__label">{textContent.iban}</label>
				<input class="form-input__input" name="iban" value={$bankRequisitesForm.iban} />
			</div>
			<div class="form-input__wrapper">
				<label class="form-input__label">{textContent.swift}</label>
				<input class="form-input__input" name="swift" value={$bankRequisitesForm.swift} />
			</div>
			<div class="form-input__wrapper">
				<label class="form-input__label">{textContent.beneficiary}</label>
				<input class="form-input__input" name="beneficiary" value={$bankRequisitesForm.beneficiary} />
			</div>
			<div class="form-input__wrapper">
				<label class="form-input__label">{textContent.registrationNumber}</label>
				<input class="form-input__input" name="registrationNumber" value={$bankRequisitesForm.registrationNumber} />
			</div>
			<div class="form-input__wrapper">
				<label class="form-input__label">{textContent.beneficiaryAddress}</label>
				<input class="form-input__input" name="beneficiaryAddress" value={$bankRequisitesForm.beneficiaryAddress} />
			</div>
			<div class="form-input__wrapper">
				<label class="form-input__label">{textContent.bank}</label>
				<input class="form-input__input" name="bankName" value={$bankRequisitesForm.bankName} />
			</div>
		</div>
		<div class="form-actions">
			<button class="btn btn-primary" disabled={$bankRequisitesSubmitting}>
				{#if $bankRequisitesSubmitting}
					Wait...
				{:else}
					{textContent.button}
				{/if}
			</button>
		</div>
	</form>

	<form action="?/setCryptoRequisites" method="post" use:cryptoRequisitesEnhance>
		<h2 class="requisites-title">{textContent.cryptoRequisitesTitle}</h2>
		<div class="requisites-grid">
			{#each CryptoCurrencies as currency}
				<div class="form-input__wrapper" class:has-error={$cryptoRequisitesErrors[currency.ticker]}>
					<label class="form-input__label">
						<div class="icon-wrapper">
							<img src="/images/coins/{currency.icon}.svg" alt={currency.ticker} />
						</div>
						{currency.name} ({currency.ticker})
					</label>
					<input class="form-input__input" name={currency.ticker} id={currency.ticker} value={$cryptoRequisitesForm[currency.ticker]} />
				</div>
			{/each}
		</div>
		<div class="form-actions">
			<button class="btn btn-primary" disabled={$cryptoRequisitesSubmitting}>
				{#if $cryptoRequisitesSubmitting}
					Wait...
				{:else}
					{textContent.button}
				{/if}
			</button>
		</div>
	</form>
</div>

<style>
	.requisites-container {
		padding: 20px;
		background-color: #1a1a1a;
		color: #fff;
		border-radius: 10px;
	}

	.requisites-title {
		text-align: center;
		margin-bottom: 24px;
		color: #b26fe7;
		margin-top: 50px;
	}

	.requisites-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.form-input__wrapper {
		margin-bottom: 16px;
	}

	.form-input__label {
		color: #b26fe7;
		margin-bottom: 8px;
		display: block;
		display: flex;
		align-items: center;
	}

	.form-input__input {
		width: 100%;
		padding: 10px;
		border: 1px solid #555;
		border-radius: 5px;
		background: #333;
		color: #fff;
	}

	.form-actions {
		text-align: center;
		margin-top: 24px;
	}

	.btn-primary {
		background-color: #b26fe7;
		border: none;
		color: #fff;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		width: 100%;
	}

	.icon-wrapper {
		display: inline-block;
		padding: 5px;
		background: #fff;
		border-radius: 5px;
		margin-right: 8px;
		padding-bottom: 1px;
	}

	.icon-wrapper img {
		width: 20px;
		height: 20px;
	}
</style>
