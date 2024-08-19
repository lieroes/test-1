<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let placeholder: string;
	export let searchParamName: string;

	let searchQuery: string = '';

	onMount(() => {
		searchQuery = $page.url.searchParams.get(searchParamName) || '';
	});

	const resetSearchQuery = () => {
		searchQuery = '';
		$page.url.searchParams.delete(searchParamName);

		const newPath = $page.url.searchParams.toString();
		goto('?' + newPath, { invalidateAll: true, noScroll: true });
	};

	const updateSearchParam = () => {
		if (searchQuery === '') return resetSearchQuery();

		$page.url.searchParams.set(searchParamName, searchQuery);
		$page.url.searchParams.delete('page');

		const newPath = $page.url.searchParams.toString();
		goto('?' + newPath, { invalidateAll: true, noScroll: true });
	};
</script>

<div class="search-bar-wrapper">
	<form class="search-bar-form" novalidate on:submit|preventDefault={updateSearchParam}>
		<input type="text" {placeholder} class="search-bar-input" bind:value={searchQuery} />
		<button type="submit" class="search-bar-submit">
			<img src="/images/icon-search.svg" alt="search" />
		</button>
	</form>
</div>

<style>
	.search-bar-wrapper {
		display: flex;
		justify-content: flex-end;
		margin: 20px 0;
	}

	.search-bar-form {
		display: flex;
		align-items: center;
		background-color: #1a1a1a;
		border: 1px solid #b26fe7;
		border-radius: 5px;
		padding: 5px;
		width: 100%;
		max-width: 400px;
	}

	.search-bar-input {
		flex: 1;
		background: none;
		border: none;
		color: #fff;
		padding: 10px;
		outline: none;
		font-size: 16px;
	}

	.search-bar-input::placeholder {
		color: #888;
	}

	.search-bar-reset,
	.search-bar-submit {
		background-color: #b26fe7;
		border: none;
		color: #fff;
		padding: 10px;
		cursor: pointer;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search-bar-reset img,
	.search-bar-submit img {
		width: 16px;
		height: 16px;
	}

	.search-bar-reset {
		margin-right: 5px;
	}

	@media screen and (max-width: 1000px) {
		.search-bar-form {
			margin-top: 24px;
		}
	}
</style>
