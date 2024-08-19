<script lang="ts">
	import { page } from '$app/stores';
	$: textContent = $page.data.langTexts.pages.order.transfer;
</script>

<div data-v-0b0797a5="">
	<div style="display: flex; justify-content: center; align-items: center; margin-bottom: 16px;">
		<div
			style="background-color: #a4a7e3; padding: 10px; border-radius: 100%; width: 72px; height: 72px; display: flex; justify-content: center; align-items: center;"
		>
			<span class="loader" />
		</div>
	</div>

	<h1 data-v-0e3ce062="" data-v-0b0797a5="" class="sales-funnel-title">{textContent.title}</h1>

	<br />

	<p style="font-size: 16px; text-align: center; margin-bottom: 16px;">
		{textContent.subtitle}
	</p>
</div>

<style>
	.loader {
		width: 48px;
		height: 48px;
		border: 5px solid #fff;
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
