<script lang="ts">
	import CopyButton from '$lib/components/CopyButton.svelte';
	import RefreshRateButton from '$lib/components/RefreshRateButton.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { networkFee, serviceFee } from '$lib/constant';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	const formatDate = (inputDate: Date, locale: string) => {
		return inputDate.toLocaleString(`${locale.toLowerCase()}-${locale.toUpperCase()}`, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: false
		});
	};

	function handleKeyPress(e: any) {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	}

	const numberRound = (number: number, round: number) =>
		Math.round(number * 10 ** round) / 10 ** round;

	const defaultAmount = '0.0';
	const newAmountRounding = 7;

	const setFromAmount = (newAmount: string) => {
		const floatAmount = parseFloat(newAmount);

		if (isNaN(floatAmount)) {
			$form.fromAmount = 0;
			$form.toAmount = 0;
			return;
		}

		$form.fromAmount = parseFloat(newAmount);
		$form.toAmount = numberRound(
			floatAmount * $form.exchangeRate * (1 - serviceFee) * (1 - networkFee),
			newAmountRounding
		);

		if (data.order.exchangeType === 'fiat-crypto') {
			$form.serviceFee = numberRound($form.fromAmount * serviceFee, 6);
			$form.networkFee = numberRound($form.toAmount * networkFee, 6);
		} else {
			$form.serviceFee = numberRound($form.toAmount * networkFee, 6);
			$form.networkFee = numberRound($form.fromAmount * serviceFee, 6);
		}
	};

	const setToAmount = (newAmount: string) => {
		const floatAmount = parseFloat(newAmount);

		if (isNaN(floatAmount)) {
			$form.fromAmount = 0;
			$form.toAmount = 0;
			return;
		}

		$form.toAmount = parseFloat(newAmount);
		$form.fromAmount = numberRound(
			floatAmount / $form.exchangeRate / (1 - serviceFee) / (1 - networkFee),
			newAmountRounding
		);

		if (data.order.exchangeType === 'fiat-crypto') {
			$form.serviceFee = numberRound($form.fromAmount * serviceFee, 6);
			$form.networkFee = numberRound($form.toAmount * networkFee, 6);
		} else {
			$form.serviceFee = numberRound($form.toAmount * networkFee, 6);
			$form.networkFee = numberRound($form.fromAmount * serviceFee, 6);
		}
	};

	const updateExchangeRate = (newRate: number) => {
		$form.exchangeRate = Number(newRate);
		setFromAmount(String($form.fromAmount));
	};

	const { form, errors, submitting, enhance } = superForm(data.orderDetailsForm);

	$: textContent = $page.data.langTexts.pages.adminEditTransaction;
	$: transactionStatuses = $page.data.langTexts.parts.transactionStatuses;
</script>

<svelte:head>
	<title>{textContent.meta.title}</title>
</svelte:head>

<div class="member-wrapper__main profile-settings">
	<div class="main-card">
		<div class="main-card__body">
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<form action="?" method="post" use:enhance on:keydown={handleKeyPress}>
				<h1 class="main-card-title">{textContent.title}</h1>
				<div class="main-card-content">
					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="" class="form-input__label">{textContent.id}</label>
						</div>
						<input value={data.order.id} disabled class="form-input__input" />
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="" class="form-input__label">{textContent.date}</label>
						</div>
						<input
							value={formatDate(data.order.createdAt, data.langCode)}
							disabled
							class="form-input__input"
						/>
					</div>

					<div class="form-input__wrapper">
						<div class="form-select__top">
							<label for="" class="form-input__label">{textContent.fromCurrency}</label>
						</div>
						<input value={data.order.fromCurrency} disabled class="form-input__input" />
					</div>

					<div class="form-input__wrapper">
						<div class="form-select__top">
							<label for="" class="form-input__label">{textContent.toCurrency}</label>
						</div>
						<input value={data.order.toCurrency} disabled class="form-input__input" />
					</div>

					<div class="form-input__wrapper">
						<div class="form-select__top">
							<label for="fromAmount" class="form-input__label">{textContent.fromAmount}</label>
						</div>
						<input
							id="fromAmount"
							name="fromAmount"
							value={$form.fromAmount}
							class="form-input__input"
							on:change={(e) => setFromAmount(e.target.value)}
						/>
					</div>

					<div class="form-input__wrapper">
						<div class="form-select__top">
							<label for="toAmount" class="form-input__label">{textContent.toAmount}</label>
						</div>
						<input
							id="toAmount"
							name="toAmount"
							value={$form.toAmount}
							class="form-input__input"
							on:change={(e) => setToAmount(e.target.value)}
						/>
					</div>

					<div class="form-input__wrapper">
						<div class="form-select__top">
							<label for="" class="form-input__label">{textContent.serviceFee}</label>
						</div>
						<input value={$form.serviceFee} disabled class="form-input__input" />
						<input type="hidden" name="serviceFee" value={$form.serviceFee} />
					</div>

					<div class="form-input__wrapper">
						<div class="form-select__top">
							<label for="" class="form-input__label">{textContent.networkFee}</label>
						</div>
						<input value={$form.networkFee} disabled class="form-input__input" />
						<input type="hidden" name="networkFee" value={$form.networkFee} />
					</div>

					<div class="form-input__wrapper" style="grid-column: 1/3;">
						<div class="form-select__top">
							<label for="receiver" class="form-input__label">{textContent.receiver}</label>
						</div>
						<div style="position: relative;">
							<input
								id="receiver"
								name="receiver"
								class="form-input__input"
								value={$form.receiver}
							/>
							<CopyButton text={data.order.receiver || ''} />
						</div>
					</div>

					<div class="form-input__wrapper">
						<div class="form-select__top">
							<label for="" class="form-input__label">{textContent.exchangeRate}</label>
						</div>
						<div style="position: relative;">
							<input
								value={`1 ${data.order.fromCurrency} = ${$form.exchangeRate.toFixed(7)} ${
									data.order.toCurrency
								}`}
								disabled
								class="form-input__input"
							/>
							<RefreshRateButton
								fromCurrency={data.order.fromCurrency}
								toCurrency={data.order.toCurrency}
								on:click={({ detail }) => updateExchangeRate(detail)}
							/>
						</div>

						<input type="hidden" value={$form.exchangeRate} name="exchangeRate" />
					</div>

					<div class="form-select__wrapper">
						<div class="form-select__top">
							<label for="status" class="form-select__label">{textContent.orderStatus}</label>
						</div>

						<div style="position: relative;">
							<select name="status" id="status" class="form-input__input" value={$form.status}>
								<option value={0}>Verification</option>
								<option value={1}>Requisites</option>
								{#if data.order.exchangeType === 'fiat-crypto'}
									<option value={2}>Payment Method</option>
								{/if}
								<option value={3}>Payment</option>
								<option value={4}>Payout</option>
								<option value={5}>Finished</option>
								<option value={6}>Rejected</option>
							</select>

							<i
								class="icon icon-arrow-bottom"
								style="width: 18px; height: 18px; position: absolute; right: 15px; top: 15px; pointer-events: none; font-size: 18px"
							/>
						</div>
					</div>
				</div>
				<div class="main-card-actions" style="padding: 24px 16px 0;">
					<button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
						{#if $submitting}
							Wait...
						{:else}
							{textContent.button}
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
