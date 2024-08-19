<script lang="ts">
	import type { PageData } from '../terms-of-use/$types';

	export let data: PageData;

	$: pageTexts = data.langTexts.pages['terms-of-use'];
</script>

<div class="text-block">
	{#each pageTexts.items as item}
		<h3><strong>{item.title}</strong></h3>
		<p>{@html item.text}</p>
	{/each}
	<br />
</div>
