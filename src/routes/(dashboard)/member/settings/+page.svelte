<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	const { form, errors, submitting, enhance } = superForm(data.updateProfileForm, {
		invalidateAll: true
	});

	$: textContent = $page.data.langTexts.pages.settings;
</script>

<svelte:head>
	<title>{textContent.meta.title}</title>
</svelte:head>

<div class="member-wrapper__main profile-settings">
	<div class="main-card">
		<div class="main-card__body">
			<form action="/member/settings" method="post" use:enhance>
				<h1 class="main-card-title">{textContent.profileTitle}</h1>
				<div class="main-card-content">
					<div class="form-input__wrapper is-disabled">
						<div class="form-input__top">
							<label for="email" class="form-input__label">{textContent.email}</label>
						</div>
						<input id="email" value={data.user.email} disabled class="form-input__input" />
					</div>
					<div class="form-input__wrapper is-disabled">
						<div class="form-input__top">
							<label for="phone" class="form-input__label">{textContent.phone}</label>
						</div>
						<input id="phone" value={data.user.phone} disabled class="form-input__input" />
					</div>

					<div class="form-input__wrapper" class:has-error={$errors.firstName}>
						<div class="form-input__top">
							<label for="firstName" class="form-input__label">{textContent.firstName}</label>
						</div>
						<input
							id="firstName"
							name="firstName"
							bind:value={$form.firstName}
							class="form-input__input"
						/>
					</div>
					<div class="form-input__wrapper" class:has-error={$errors.lastName}>
						<div class="form-input__top">
							<label for="lastName" class="form-input__label">{textContent.lastName}</label>
						</div>
						<input
							id="lastName"
							name="lastName"
							bind:value={$form.lastName}
							class="form-input__input"
						/>
					</div>

					<h2 class="main-card-title" style="grid-column: 1/3; margin-top: 16px;">
						{textContent.passwordTitle}
					</h2>

					<div class="form-input__wrapper" class:has-error={$errors.password}>
						<div class="form-input__top">
							<label for="password" class="form-input__label">{textContent.password}</label>
						</div>
						<input
							type="password"
							id="password"
							name="password"
							bind:value={$form.password}
							class="form-input__input"
						/>
					</div>
					<div class="form-input__wrapper" class:has-error={$errors.passwordConfirm}>
						<div class="form-input__top">
							<label for="passwordConfirm" class="form-input__label">
								{textContent.passwordConfirm}
							</label>
						</div>
						<input
							type="password"
							id="passwordConfirm"
							name="passwordConfirm"
							bind:value={$form.passwordConfirm}
							class="form-input__input"
						/>
					</div>
				</div>
				<div class="main-card-actions">
					<button type="submit" class="btn btn-primary btn-lg">
						{#if $submitting}
							Wait...
						{:else}
							{textContent.button}
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	.member-wrapper__main {
		background-color: black;
	}

	.main-card-title {
		color: white;
	}

	.member-wrapper__main {
		background-color: transparent;
	}

	.main-card {
		background-color: transparent;
	}

	.form-input__top {
		color: #8237BC;
	}

	.form-input__top {
		color: #8237BC;
	}

	input {
		background-color: transparent;
		border: 2px solid #8237BC;
		color: white;
	}

	button {
		background-color: #8237BC;
	}
</style>
