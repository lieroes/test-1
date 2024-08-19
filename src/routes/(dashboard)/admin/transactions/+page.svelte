<script lang="ts">
	import { page } from '$app/stores';
	import Pagination from '$lib/components/Pagination.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { PageData } from './$types';

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

	const shortenId = (id: string) => id.substring(0, 8);

	$: textContent = $page.data.langTexts.pages.transactions;
	$: tableHeader = $page.data.langTexts.parts.tableHeader;
	$: transactionStatuses = $page.data.langTexts.parts.transactionStatuses;
</script>

<svelte:head>
	<title>{textContent.meta.title}</title>
</svelte:head>

<SearchBar placeholder={textContent.searchBarPlaceholder} searchParamName="q" />

<div class="transaction-table-container">
	<div class="transaction-table-header">
		<div class="transaction-table-cell">{tableHeader.date}</div>
		<div class="transaction-table-cell">{tableHeader.operation}</div>
		<div class="transaction-table-cell">{tableHeader.invoice}</div>
		<div class="transaction-table-cell">{tableHeader.status}</div>
	</div>
	{#if data.orders.length === 0}
		<div class="no-transactions">{textContent.transactionsNotFound}</div>
	{/if}

	{#each data.orders as order}
		<a href="/order/{order.id}" class="transaction-row">
			<div class="transaction-cell date-cell">
				<span>{formatDate(order.createdAt, data.langCode)}</span>
			</div>
			<div class="transaction-cell">
				<div class="transaction-type">
					<span>{order.fromAmount} {order.fromCurrency}</span>
					<i class="icon icon-doublearrow"></i>
					<span>{order.toAmount} {order.toCurrency}</span>
				</div>
			</div>
			<div class="transaction-cell invoice-cell">
				<span>{shortenId(order.id)}</span>
			</div>
			<div class="transaction-cell">
				<span>{transactionStatuses[order.status]}</span>
			</div>
		</a>
	{/each}
</div>

<Pagination itemsCount={data.ordersCount} itemsPerPage={10} paramName={'page'} />

<style>
	.transaction-table-container {
		width: 110%;
		padding: 16px;
		color: #fff;
	}

	.transaction-table-header,
	.transaction-row {
		display: flex;
		justify-content: space-between;
		padding: 8px;
		border-bottom: 1px solid #333;
	}

	.transaction-row {
		transition: background-color 0.2s ease;
	}

	.transaction-row:hover {
		background-color: #444;
	}

	.transaction-table-cell {
		flex: 1;
		text-align: left;
		padding: 8px;
	}

	.transaction-cell {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.date-cell,
	.invoice-cell {
		color: #B26FE7;
	}

	.transaction-type {
		display: flex;
		align-items: center;
	}

	.transaction-type .icon-doublearrow {
		margin: 0 8px;
	}

	.icon-clock,
	.icon-check-double,
	.icon-close {
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}

	.no-transactions {
		text-align: center;
		padding: 16px;
		font-size: 16px;
		color: #888;
	}

	.icon-doublearrow {
		width: 40px;
		color: #B26FE7;
	}

	.transaction-cell {
		margin-right: 35px;
	}
</style>
