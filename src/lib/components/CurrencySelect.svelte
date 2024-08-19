<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import exchangeStore from '$lib/stores/exchangeStore';

	// @ts-ignore
	import ClickOutside from 'svelte-click-outside';

	export let title: string;
	export let searchParamName: string;
	export let currencies: any[];
	export let isFiat: boolean = false;
	export let selectedCurrencyTicker: string;
	export let error: string | null = null;

	let triggerElement;
	let filterQuery = '';
	let isDropdownVisible = false;
	let selectedCurrency =
		currencies.find((currency: any) => currency.ticker === selectedCurrencyTicker) || currencies[0];
	$: filteredCurrencies = currencies.filter(
		(currency: any) =>
			currency.ticker.toLowerCase().includes(filterQuery.toLowerCase()) ||
			currency.name.toLowerCase().includes(filterQuery.toLowerCase())
	);
	$: inputValue = ($exchangeStore as any)[searchParamName].amount;

	const toggleDropdown = () => (isDropdownVisible = !isDropdownVisible);
	const closeDropdown = () => (isDropdownVisible = false);

	const setCurrency = (newCurrency: any) => {
		selectedCurrency = newCurrency;
		$exchangeStore.resetAmount();
		updateSearchParam(searchParamName, newCurrency.ticker);
		closeDropdown();
	};

	const updateSearchParam = (paramName: string, paramValue: string) => {
		$page.url.searchParams.set(paramName, paramValue);

		const newPath = $page.url.searchParams.toString();
		goto('?' + newPath, { invalidateAll: true, noScroll: true });
	};

	const handleAmountChange = (e: any) => {
		const target = e.target;
		($exchangeStore as any)[searchParamName].update(target.value);
	};
</script>

<div class="form-layout__label-{searchParamName}">
	<label for="exchange-form-{searchParamName}">{title}</label>
</div>

<div class="form-layout__item-{searchParamName}">
	<div class="popup-wrapper" class:is-open={isDropdownVisible}>
		<div class="exchange-form-item">
			<input
				type="text"
				class="input"
				on:input={(e) => handleAmountChange(e)}
				bind:value={inputValue}
			/>
			<button
				type="button"
				class="exchange-money-service"
				on:click={toggleDropdown}
				bind:this={triggerElement}
			>
				<div class="exchange-money-service__body">
					<span class="exchange-money-service__currency">
						{selectedCurrency.ticker.split(' ')[0]}
					</span>
					<span class="exchange-money-service__service">
						{isFiat ? 'Fiat Currency' : selectedCurrency.name}
						{selectedCurrency.chain ? `(${selectedCurrency.chain})` : ''}
					</span>
				</div>
				<span class="exchange-money-service__icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
						<path
							d="m466.745 658.746-165.49-165.491C260.937 452.937 289.492 384 346.509 384h330.982c57.018 0 85.574 68.937 45.254 109.255L557.254 658.746c-24.994 24.992-65.516 24.992-90.51 0z"
						/>
					</svg>
				</span>
			</button>
		</div>
		{#if error}
			<p class="exchange-form-item-error">
				{error}
			</p>
		{/if}
		{#if isDropdownVisible}
			<ClickOutside on:clickoutside={closeDropdown} exclude={[triggerElement]}>
				<div class="popup">
					<div class="currency-select">
						<div class="currency-select__header">
							<div class="currency-select__title">Select currency</div>
							<div class="currency-select__search">
								<input placeholder="Search" class="filter-input" bind:value={filterQuery} />
							</div>
						</div>
						<div class="scroll-wrapper">
							<div class="scroll-block">
								<div class="currency-select__list">
									{#if isFiat}
										{#each filteredCurrencies as currency}
											<button
												type="button"
												class="fiat-currency"
												on:click={() => setCurrency(currency)}
												class:fiat-currency--selected={currency.ticker === selectedCurrency.ticker}
											>
												<div class="fiat-currency__currency">{currency.ticker}</div>
												<div class="fiat-currency__label">{currency.name}</div>
											</button>
										{/each}
									{:else}
										{#each filteredCurrencies as currency}
											<button
												class="crypto-currency crypto-currency--selected"
												on:click={() => setCurrency(currency)}
												class:crypto-currency--selected={currency.ticker ===
													selectedCurrency.ticker}
											>
												<div class="crypto-currency__item crypto-currency__icon">
													<img
														src="/images/coins/{currency.icon}.svg"
														loading="lazy"
														width="16"
														height="16"
														alt={currency.ticker}
													/>
												</div>
												<div class="crypto-currency__item crypto-currency__label">
													{currency.name}
												</div>
												<div class="crypto-currency__item crypto-currency__currency">
													{currency.ticker}
												</div>
											</button>
										{/each}
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
			</ClickOutside>
		{/if}
	</div>
</div>
<div class="form-layout__error-from" style="display: none;" />

<style>
	.form-layout__label-from,
.form-layout__label-to {
	margin-bottom: 10px;
	font-size: 16px;
	color: #fff;
}

.form-layout__item-from,
.form-layout__item-to {
	position: relative;
	margin-bottom: 20px;
}

.input {
	width: calc(100% - 50px);
	padding: 10px;
	font-size: 18px;
	color: #fff;
	border-radius: 5px;
}

.input::placeholder {
	color: #fff;
	opacity: 0.7;
}

.input:focus {
	outline: none;
	border-color: #fff;
}

.exchange-money-service {
	background-color: #8E24AA;
	color: #fff;
	border: 2px solid #8E24AA;
	border-radius: 5px;
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 10px;
}

.exchange-money-service__body {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.exchange-money-service__currency {
	font-size: 18px;
	font-weight: bold;
}

.exchange-money-service__service {
	font-size: 14px;
}

.exchange-money-service__icon {
	margin-left: 10px;
}

.exchange-form-item-error {
	color: #ff0000;
	font-size: 14px;
	margin-top: 5px;
}

.popup-wrapper {
	position: relative;
}

.popup {
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	background-color: #131313;
	border: 1px solid #888;
	border-radius: 5px;
	z-index: 10;
	height: 260px;
}

.currency-select {
	padding: 10px;
}

.currency-select__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.currency-select__title {
	font-size: 16px;
	color: #fff;
}

.filter-input {
	width: 100%;
	padding: 10px;
	font-size: 16px;
	border: 2px solid #8E24AA;
	border-radius: 5px;
	background-color: transparent;
	color: #fff;
}

.filter-input::placeholder {
	color: #fff;
	opacity: 0.7;
}

.scroll-wrapper {
	max-height: 100%;
	overflow-y: auto;
}

.currency-select__list {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.fiat-currency,
.crypto-currency {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	background-color: #8E24AA;
	border: 2px solid #8E24AA;
	border-radius: 5px;
	cursor: pointer;
}

.fiat-currency__currency,
.crypto-currency__currency {
	font-size: 16px;
	color: #fff;
}

.fiat-currency__label,
.crypto-currency__label {
	font-size: 14px;
	color: #fff;
}



</style>
