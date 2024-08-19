<script lang="ts">
	// Libraries
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// Props
	export let itemsCount: number;
	export let itemsPerPage: number = 10;
	export let paramName: string = 'currentPage';

	$: currentPage = Number($page.url.searchParams.get(paramName)) || 0;
	$: $page.url.searchParams.delete(paramName);

	const updateSearchParam = (e: Event) => {
		const target = e.target as HTMLSelectElement;
		$page.url.searchParams.set(target.name, target.value);

		const newPath = $page.url.searchParams.toString();
		goto('?' + newPath, { invalidateAll: true, noScroll: true });
	};
</script>

{#if itemsCount > itemsPerPage}
	<div style="display: flex; align-items: center; justify-content: center; margin-top: 16px">
		<div
			class="btn-group variant-ghost-surface"
			style="display: flex; justify-content: center; align-items: center; gap: 8px"
		>
			<button
				disabled={currentPage === 0}
				name={paramName}
				value={currentPage - 1}
				on:click|preventDefault={updateSearchParam}
				class="pagination-button"
			>
				<i class="icon icon-arrow-left" style="width: 16px;height: 16px;" />
			</button>
			<button class="!text-sm">
				{itemsPerPage * currentPage + 1}-{itemsPerPage * currentPage + itemsPerPage <= itemsCount
					? itemsPerPage * currentPage + itemsPerPage
					: itemsCount} из {itemsCount}</button
			>
			<button
				disabled={itemsPerPage * currentPage + itemsPerPage >= itemsCount}
				name={paramName}
				value={currentPage + 1}
				on:click|preventDefault={updateSearchParam}
				class="pagination-button"
			>
				<i class="icon icon-arrow-right" style="width: 16px;height: 16px;" />
			</button>
		</div>
	</div>
{/if}

<style>
	.pagination-button {
		width: 30px;
		height: 30px;
		background-color: #000;
		cursor: pointer;
		border-radius: 6px;
		color: #fff;
		transition: background-color 0.2s linear, color 0.2s linear;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pagination-button i {
		pointer-events: none;
	}

	.pagination-button:hover {
		background-color: #00b57b;
		color: #fff;
	}

	.pagination-button:disabled {
		background-color: rgba(0, 0, 0, 0.65);
	}
</style>
