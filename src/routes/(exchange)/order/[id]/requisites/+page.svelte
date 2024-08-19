<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from '../wallet/$types';
	import { page } from '$app/stores';

	export let data: PageData;

	const { form, errors, submitting, enhance } = superForm(data.receiverForm);

	$: textContent = $page.data.langTexts.pages.order.wallet;
</script>

<div data-v-0b0797a5="">
	<h1 data-v-0e3ce062="" data-v-0b0797a5="" class="sales-funnel-title">
		{data.order.exchangeType === 'fiat-crypto' ? textContent.title.crypto : textContent.title.fiat}
	</h1>
	<br />
	<form action="?" method="post" use:enhance>
		<div data-v-49c05ea7="" data-v-0b0797a5="" class="address-qr-scanner">
			<div data-v-3ea2737a="" data-v-49c05ea7="" class="form-row mb-16 is-lg">
				<div
					data-v-49c05ea7=""
					class="form-input__wrapper"
					class:has-error={$errors.receiver}
					data-v-3ea2737a=""
				>
					<input
						name="receiver"
						type="text"
						inputmode="text"
						placeholder={data.order.exchangeType === 'fiat-crypto'
							? textContent.requisites.crypto
							: textContent.requisites.fiat}
						class="form-input__input"
						style="text-align: center;"
						value={$form.receiver}
					/>
					<div class="form-input__comment" />
				</div>
			</div>
		</div>
		<div data-v-05c4f620="" data-v-0b0797a5="" class="sales-funnel-actions" style="margin: 16px 0;">
			<div data-v-05c4f620="" class="sales-funnel-actions__submit">
				<button
					data-v-0b0797a5=""
					data-v-05c4f620=""
					class="btn btn-lg btn-primary"
					style="width: 100%;"
					disabled={$submitting}
				>
					{#if $submitting}
						Wait...
					{:else}
						{textContent.button}
					{/if}
				</button>
			</div>
		</div>
	</form>
</div>
