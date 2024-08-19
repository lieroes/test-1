<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import exchangeStore from '$lib/stores/exchangeStore';
	import cryptoCurrencies from '$lib/json/crypto-currencies.json';
	import fiatCurrencies from '$lib/json/fiat-currencies.json';

	import Features from '$lib/components/sections/Features.svelte';
	import Packages from '$lib/components/sections/Packages.svelte';
	import Transactions from '$lib/components/sections/Transactions.svelte';
	import SmallCta from '$lib/components/sections/SmallCta.svelte';
	import Guide from '$lib/components/sections/Guide.svelte';
	import FrequentQuestions from '$lib/components/sections/FrequentQuestions.svelte';
	import LargeCta from '$lib/components/sections/LargeCta.svelte';
	import ExchangeRatesCarousel from '$lib/components/sections/ExchangeRatesCarousel.svelte';

	import CurrencySelect from '$lib/components/CurrencySelect.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { maxExchangeLimit, minExchangeLimit, networkFee, serviceFee } from '$lib/constant';

	export let data: PageData;

	const { form, errors, submitting, enhance } = superForm(data.buyForm);

	$: $exchangeStore.exchangeRate = data.exchangeRate;
	$: textContent = data.langTexts.pages.buy;

	onMount(() => {
		$exchangeStore.resetAmount();
		if (data.amount) $exchangeStore.from.update(data.amount);
	});
</script>

<svelte:head>
	<title>{textContent.meta.title}</title>
</svelte:head>

<div class="hero-section">
	<div class="hero-background" />
	<div class="hero-text">
		<p class="welcome-text">{textContent.hero.welcome}</p>
		<h1 class="hero-title">
			<span>{textContent.hero.title.part1}</span>
			<span class="highlighted-text">{textContent.hero.title.highlighted}</span>
		</h1>
		<p class="hero-description">
			{textContent.hero.description}
		</p>
		<div class="exchange-flow-select">
			<a href="/" class="exchange-flow exchange-flow--active">{textContent.actionButtons.buy}</a>
			<img src="/images/change.svg" alt="Buy Icon" class="flow-icon" />
			<a href="/sell" class="exchange-flow">{textContent.actionButtons.sell}</a>
		</div>
	</div>
	<div class="image-container">
		<img src="/images/hand.svg" alt="Crypto Image" class="main-image" />
	</div>
	<div class="exchange-form-container">
		<form action="/buy" method="post" use:enhance>
			<input type="hidden" name="exchangeRate" value={$exchangeStore.exchangeRate} />
			<input type="hidden" name="fromCurrency" value={$form.fromCurrency} />
			<input type="hidden" name="toCurrency" value={$form.toCurrency} />
			<input type="hidden" name="fromAmount" value={parseFloat($exchangeStore.from.amount)} />
			<input type="hidden" name="toAmount" value={parseFloat($exchangeStore.to.amount)} />
			<input
				type="hidden"
				name="serviceFee"
				value={parseFloat($exchangeStore.from.amount) * serviceFee}
			/>
			<input
				type="hidden"
				name="networkFee"
				value={parseFloat($exchangeStore.to.amount) * networkFee}
			/>

			<div class="form-layout">
				<CurrencySelect
					title={textContent.selectTitles.spend}
					selectedCurrencyTicker={data.fromCurrency}
					searchParamName="from"
					currencies={fiatCurrencies}
					error={parseFloat($exchangeStore.from.amount) >= maxExchangeLimit[data.fromCurrency]
						? `Amount must be less than ${maxExchangeLimit[data.fromCurrency].toFixed(2)} ${
								data.fromCurrency
						  }`
						: null}
					isFiat={true}
				/>
				<CurrencySelect
					title={textContent.selectTitles.receive}
					selectedCurrencyTicker={data.toCurrency}
					searchParamName="to"
					currencies={cryptoCurrencies}
					isFiat={false}
				/>
				<div class="form-layout__action">
					<button
						type="submit"
						class="exchange-form-action"
						disabled={!(
							parseFloat($exchangeStore.from.amount) > 0 &&
							parseFloat($exchangeStore.from.amount) <= maxExchangeLimit[data.fromCurrency] &&
							parseFloat($exchangeStore.from.amount) >= minExchangeLimit[data.fromCurrency]
						)}
					>
						{textContent.button}
					</button>
				</div>
			</div>
			<section class="commission-details">
				<h3 class="commission-details__title">{textContent.commission.title}</h3>
				<div class="commission-details__list">
					<section class="commission">
						<h4>{textContent.commission.service}</h4>
						<div class="light-purple-text">
							{(Number($exchangeStore.from.amount) * 0.04).toFixed(2)}
							{data.fromCurrency.split(' ')[0]}
						</div>
					</section>
					<section class="commission">
						<h4>{textContent.commission.network}</h4>
						<div class="light-purple-text">
							{(Number($exchangeStore.to.amount) * 0.02).toFixed(7)}
							{data.toCurrency.split(' ')[0]}
						</div>
					</section>
				</div>
			</section>
		</form>
	</div>
</div>

<LargeCta />
<Guide />
<ExchangeRatesCarousel currencies={data.cryptoCurrencies} currencyCode={data.fromCurrency} />
<Packages currencies={data.cryptoCurrencies} currencyCode={data.fromCurrency} />
<SmallCta />
<Features />
<FrequentQuestions />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

	body {
		margin: 0;
		font-family: 'Inter', sans-serif;
		background-color: #000;
		color: #fff;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.hero-section {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-top: 150px;
		background-color: #000;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}

	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('/images/dots.gif');
		background-size: cover;
		background-position: center;
		opacity: 0.2;
	}

	.hero-text {
		max-width: 90%;
		text-align: center;
		z-index: 1;
		animation: slide-in-left 1s ease-out forwards;
	}

	@keyframes slide-in-left {
		from {
			transform: translateX(-100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	.welcome-text {
		font-size: 16px;
		color: #fff;
		margin-bottom: 10px;
	}

	.hero-title {
		font-size: 48px;
		margin: 0;
		color: #fff;
	}

	.highlighted-text {
		color: #8e24aa;
	}

	.hero-description {
		font-size: 18px;
		color: #bbb;
		margin: 20px 0;
	}

	.exchange-flow-select {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin: 20px 0;
		margin-top: 40px;
	}

	.exchange-flow {
		font-size: 16px;
		border: none;
		background-color: transparent;
		color: #fff;
		cursor: pointer;
	}

	.exchange-flow--active {
		color: #8e24aa;
	}

	.flow-icon {
		width: 24px;
		height: 24px;
	}

	.commission-details {
		margin-top: 20px;
		text-align: center;
	}

	.commission-details__title {
		font-size: 18px;
		margin-bottom: 10px;
		color: #fff;
	}

	.commission-details__list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
	}

	.commission {
		font-size: 14px;
		color: #fff;
	}

	.light-purple-text {
		color: #8e24aa;
	}

	.image-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		z-index: 1;
	}

	.main-image {
		width: 100%;
		max-width: 400px;
		height: auto;
	}

	.exchange-form-container {
		background-color: #131313;
		padding: 20px;
		border-radius: 10px;
		width: 90%;
		max-width: 400px;
		border: 1px solid #888;
		margin-top: 20px;
		z-index: 1;
		animation: slide-in-right 1s ease-out forwards;
	}

	@keyframes slide-in-right {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	.form-layout {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.exchange-form-action {
		background-color: #8e24aa;
		border: none;
		color: #fff;
		padding: 10px 20px;
		cursor: pointer;
		border-radius: 5px;
		font-size: 20px;
	}

	input {
		border: 2px solid #888;
		color: #fff;
		background-color: transparent;
		padding: 10px;
		border-radius: 5px;
	}

	input:focus {
		outline: none;
	}

	.form-layout__action {
		text-align: center;
		background-color: #8e24aa;
		width: 200px;
		margin: 0 auto;
		border-radius: 10px;
	}

	@media (max-width: 768px) {
		.hero-title {
			font-size: 26px;
		}
		.hero-description {
			font-size: 16px;
		}
		.hero-section {
			padding-top: 100px;
		}
	}

	@media (min-width: 860px) {
		.hero-section {
			flex-direction: row;
			align-items: flex-start;
		}

		.hero-text {
			max-width: 30%;
			text-align: left;
		}

		.image-container {
			margin-top: 0;
		}

		.exchange-form-container {
			width: 30%;
			margin-top: 0;
		}
	}

	@media (min-width: 1024px) {
		.hero-title {
			font-size: 56px;
		}

		.hero-description {
			font-size: 20px;
		}
	}
</style>
