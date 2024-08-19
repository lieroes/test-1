<script lang="ts">
	// @ts-nocheck
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: textContent = $page.data.langTexts.pages.order;

	let interval = null

	onMount(async () => {
		interval = setInterval(async () => {
			const res = await fetch(`/api/order-status/${data.order.id}`)
			const resData = await res.json()

			if (resData.status !== data.order.status) {
				goto(`/order/${data.order.id}`)
			}
		}, 10000)
	})

	onDestroy(() => clearTimeout(interval));
</script>

<svelte:head>
	<title>{textContent.meta.title}</title>
	<style>
		.main {
			background-color: #a4e3ab;
		}
	</style>
</svelte:head>

<div data-v-857dce44="" class="sales-funnel-wrapper">
	<div data-v-857dce44="" class="sales-funnel-wrapper__container">
		<div data-v-857dce44="" class="sales-funnel-wrapper__header">
			<ul data-v-52bce5a6="" class="sales-funnel-header-steps" data-v-857dce44="">
				<li
					data-v-52bce5a6=""
					class="sales-funnel-header-steps__item"
					class:is-active={data.order.status >= 0}
				>
					{textContent.headerSteps[3]}
				</li>
				<li
					data-v-52bce5a6=""
					class="sales-funnel-header-steps__item"
					class:is-active={data.order.status >= 1}
				>
					{textContent.headerSteps[0]}
				</li>
				{#if data.order.exchangeType === 'fiat-crypto'}
					<li
						data-v-52bce5a6=""
						class="sales-funnel-header-steps__item"
						class:is-active={data.order.status >= 2}
					>
						{textContent.headerSteps[1]}
					</li>
				{/if}
				<li
					data-v-52bce5a6=""
					class="sales-funnel-header-steps__item"
					class:is-active={data.order.status >= 3}
				>
					{textContent.headerSteps[2]}
				</li>
				
				<li
					data-v-52bce5a6=""
					class="sales-funnel-header-steps__item"
					class:is-active={data.order.status >= 4}
				>
					{textContent.headerSteps[4]}
				</li>
				<li
					data-v-52bce5a6=""
					class="sales-funnel-header-steps__item"
					class:is-active={data.order.status >= 5}
				>
					{textContent.headerSteps[5]}
				</li>
			</ul>
		</div>
		<div data-v-857dce44="" class="sales-funnel-wrapper__body">
			<div data-v-0b0797a5="" data-v-857dce44="">
				<slot />
			</div>
		</div>
		<div data-v-857dce44="" class="sales-funnel-wrapper__footer">
			<div data-v-c7fc33a2="" class="sales-funnel-current-transaction" data-v-857dce44="">
				<div data-v-c7fc33a2="" class="sales-funnel-current-transaction__pair">
					<div data-v-c7fc33a2="" class="sales-funnel-current-transaction__item">
						<img
							data-v-c7fc33a2=""
							src={data.order.exchangeType === 'fiat-crypto'
								? '/images/credit-card.svg'
								: `/images/coins/${data.order.fromCurrency.split(' ')[0].toLowerCase()}.svg`}
							alt={data.order.fromCurrency}
							title={data.order.fromCurrency}
							class="sales-funnel-current-transaction__icon"
						/>
						<span data-v-c7fc33a2="">{data.order.fromAmount} {data.order.fromCurrency}</span>
					</div>
					<div data-v-c7fc33a2="" class="sales-funnel-current-transaction__arrow is-equal" />
					<div data-v-c7fc33a2="" class="sales-funnel-current-transaction__item">
						<img
							data-v-c7fc33a2=""
							src={data.order.exchangeType === 'fiat-crypto'
								? `/images/coins/${data.order.toCurrency.split(' ')[0].toLowerCase()}.svg`
								: '/images/credit-card.svg'}
							alt={data.order.toCurrency}
							title={data.order.toCurrency}
							class="sales-funnel-current-transaction__icon"
						/>
						<span data-v-c7fc33a2="" class="">{data.order.toAmount} {data.order.toCurrency}</span>
					</div>
				</div>
				<div data-v-5fac9a0c="" data-v-c7fc33a2="" class="transaction-fees">
					<p data-v-5fac9a0c="" class="transaction-fees__info">
						{textContent.footer.serviceFee}

						<b data-v-5fac9a0c="">
							{data.order.serviceFee.toFixed(2)}
							{data.order.exchangeType === 'fiat-crypto'
								? data.order.fromCurrency.split(' ')[0]
								: data.order.toCurrency.split(' ')[0]}</b
						>
					</p>
					<p data-v-5fac9a0c="" class="transaction-fees__info">
						{textContent.footer.networkFee}

						<b data-v-5fac9a0c="">
							{data.order.networkFee.toFixed(7)}
							{data.order.exchangeType === 'fiat-crypto'
								? data.order.toCurrency.split(' ')[0]
								: data.order.fromCurrency.split(' ')[0]}</b
						>
					</p>
				</div>
			</div>
			<div data-v-78f24f82="" class="sales-funnel-footer-text" data-v-857dce44="">
				{textContent.footer.invoice}: {data.order.id}
			</div>
		</div>
	</div>
</div>

<style>
	.main {
		background-color: black;
	}
</style>