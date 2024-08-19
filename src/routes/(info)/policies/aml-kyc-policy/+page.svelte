<script lang="ts">
	import type { PageData } from '../aml-kyc-policy/$types';

	export let data: PageData;

	$: pageTexts = data.langTexts.pages['aml-kyc-policy'];
</script>

<div class="text-block">
	{#each pageTexts.items as item}
		<h3><strong>{item.title}</strong></h3>
		<p>{@html item.text}</p>
	{/each}
	<br />
</div>
