<script lang="ts">
	import { onDestroy } from 'svelte';

	export let top: number = 4;
	export let right: number = 0;
	export let text: string;

	let isCopied: boolean = false;
	let timeout: NodeJS.Timeout;

	const handleClick = async (e: Event) => {
		await navigator.clipboard.writeText(text);

		isCopied = true;

		timeout = setTimeout(() => {
			isCopied = false;
		}, 1000);
	};

	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<button
	type="button"
	style="position: absolute; top: {top}px; right: {right}px; background-color: #fff; padding: 10px"
	on:click={handleClick}
>
	{#if isCopied}
		<i class="icon icon-checkbox" />
	{:else}
		<i class="icon icon-copy" />
	{/if}
</button>
