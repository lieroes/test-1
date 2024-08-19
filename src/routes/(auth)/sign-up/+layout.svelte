<script lang="ts">
	import { page } from '$app/stores';

	$: textContent = $page.data.langTexts.pages.signUp;
</script>

<svelte:head>
	<title>{textContent.meta.title}</title>
	<style>
		.main {
			background-color: #131311;
		}
	</style>
</svelte:head>

<div class="auth-container active">
	<div class="auth-wrapper">
		<div class="auth-wrapper__inner">
			<div class="auth-wrapper__body">
				<slot />
			</div>
		</div>
	</div>
</div>
