<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';

	export let top: number = 4;
	export let right: number = 0;
	export let fromCurrency: string;
	export let toCurrency: string;

	const dispatch = createEventDispatcher();

	let isLoading: boolean = false;

	const handleClick = async (e: Event) => {
		try {
			isLoading = true;
			const exchangeRateReq = await fetch(
				`https://api.coinbase.com/v2/prices/${fromCurrency}-${toCurrency}/spot`
			);
			const { data } = await exchangeRateReq.json();

			dispatch('click', data.amount);
		} catch (error) {
			console.log(error);
		}

		isLoading = false;
	};
</script>

<button
	type="button"
	style="position: absolute; top: {top}px; right: {right}px; background-color: ##5f5f5; padding: 10px"
	on:click={handleClick}
	class:spin-animation={isLoading}
>
	<i class="icon icon-repeat" />
</button>

<style>
	@keyframes spin {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.spin-animation {
		animation: spin 1s linear;
	}
</style>
