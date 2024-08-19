<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { maxPaySafeCardLimit, minPaySafeCardLimit } from '$lib/constant';

	export let data: PageData;

	type PaymentMethod = 'credit-card' | 'bank-transfer' | 'safe-card'

	let selectedPaymentMethod: PaymentMethod | null  = null;

	const setSelectedPaymentMethod = (paymentMethod: PaymentMethod) =>
		(selectedPaymentMethod = paymentMethod);

	const { form, errors, submitting, enhance } = superForm(data.paymentMethodForm);

	$: textContent = $page.data.langTexts.pages.order.paymentMethod;
</script>

<div data-v-0b0797a5="">
	<h1 data-v-0e3ce062="" data-v-0b0797a5="" class="sales-funnel-title">Payment method</h1>
	<br />

	<form action="?" method="post" use:enhance>
		<input name="paymentMethod" type="hidden" value={selectedPaymentMethod} />
		<div data-v-49c05ea7="" data-v-0b0797a5="" class="address-qr-scanner">
			<div data-v-3ea2737a="" data-v-49c05ea7="" class="form-row mb-16 is-lg">
				<div data-v-49c05ea7="" class="form-input__wrapper" data-v-3ea2737a="">
					<div data-v-3ea2737a="" class="form-row is-lg" data-v-69bb306a="">
						<div
							data-v-24c3364c=""
							class="card-select"
							data-v-3ea2737a=""
							style="padding: 0; overflow: hidden"
						>	
							{#if (
								data.order.fromCurrency === "EUR" && 
								data.order.fromAmount >= minPaySafeCardLimit[data.order.fromCurrency] && 
								data.order.fromAmount <= maxPaySafeCardLimit[data.order.fromCurrency] 
							)}
								<button
									type="button"
									data-v-24c3364c=""
									class="card-select__item"
									on:click={() => setSelectedPaymentMethod('safe-card')}
								>
									<div data-v-24c3364c="" class="card-select__item-header">
										<div
											style="display: flex; justify-content: center; align-items: center; height: 24px; width: 24px;"
										>
											<img
											src="/images/safe-card.svg"
											alt="Credit Card"
											style="display: block; width: 24px; height: 24px"
											/>
										</div>
										<div data-v-24c3364c="" class="card-select__item-main">
											<div data-v-24c3364c="" class="card-select__item-placeholder">
												{textContent.safeCard}
											</div>
										</div>
										{#if selectedPaymentMethod === 'safe-card'}
											<i class="icon icon-checkbox" style="width: 16px; height: 16px;" />
										{/if}
									</div>
								</button>
							{/if}
							<button
								type="button"
								data-v-24c3364c=""
								class="card-select__item"
								on:click={() => setSelectedPaymentMethod('credit-card')}
							>
								<div data-v-24c3364c="" class="card-select__item-header">
									<div
										style="display: flex; justify-content: center; align-items: center; height: 24px; width: 24px;"
									>
										<img
											src="/images/credit-card.svg"
											alt="Credit Card"
											style="display: block; width: 24px; height: 24px"
										/>
									</div>
									<div data-v-24c3364c="" class="card-select__item-main">
										<div data-v-24c3364c="" class="card-select__item-placeholder">
											{textContent.bankCard}
										</div>
									</div>
									{#if selectedPaymentMethod === 'credit-card'}
										<i class="icon icon-checkbox" style="width: 16px; height: 16px;" />
									{/if}
								</div>
							</button>
							<button
								type="button"
								data-v-24c3364c=""
								class="card-select__item"
								on:click={() => setSelectedPaymentMethod('bank-transfer')}
							>
								<div data-v-24c3364c="" class="card-select__item-header">
									<div
										style="display: flex; justify-content: center; align-items: center; height: 24px; width: 24px;"
									>
										<img
											src="/images/bank.svg"
											alt="Bank Account"
											style="display: block; width: 24px; height: 24px"
										/>
									</div>
									<div data-v-24c3364c="" class="card-select__item-main">
										<div data-v-24c3364c="" class="card-select__item-placeholder">
											{textContent.bankTransfer}
										</div>
									</div>
									{#if selectedPaymentMethod === 'bank-transfer'}
										<i class="icon icon-checkbox" style="width: 16px; height: 16px;" />
									{/if}
								</div>
							</button>
						</div>
					</div>
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
