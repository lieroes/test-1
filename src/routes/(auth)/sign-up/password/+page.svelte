<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	const { form, errors, submitting, enhance } = superForm(data.passwordForm);
	$: textContent = $page.data.langTexts.pages.signUp;
</script>

<form method="post" action="/sign-up/password" use:enhance>
	<div class="auth-app-header">{textContent.title}</div>
	<div class="form-input__wrapper" class:has-error={$errors.password}>
		<div class="form-input__top">
			<label for="" class="form-input__label">{textContent.password}</label>
		</div>
		<input
			name="password"
			type="password"
			placeholder=""
			class="form-input__input"
			bind:value={$form.password}
		/>
	</div>
	<br />
	<div class="form-input__wrapper" class:has-error={$errors.passwordConfirm}>
		<div class="form-input__top">
			<label for="" class="form-input__label">{textContent.passwordConfirm}</label>
		</div>
		<input
			name="passwordConfirm"
			type="password"
			placeholder=""
			class="form-input__input"
			bind:value={$form.passwordConfirm}
		/>
	</div>

	<div class="auth-app-footer">
		<button class="btn btn-primary btn-lg">
			{#if $submitting}
				Wait...
			{:else}
				{textContent.button}
			{/if}
		</button>
		<div class="auth-app-footer__secondary">
			<a href="/sign-in" class="btn-link">Есть аккаунт? Авторизоваться</a>
		</div>
	</div>
</form>
