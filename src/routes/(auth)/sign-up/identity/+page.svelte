<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	import { launchWebSdk } from '$lib/client/sumsub';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { enhance } = superForm(data.identityForm);
	let formRef: HTMLFormElement;

	const onApplicantStatusChangedHandler = (payload: any) => {
		if (payload.reviewStatus === 'completed') formRef.submit();
	};

	onMount(() => {
		launchWebSdk({
			selector: '#sumsub-websdk-container',
			accessToken: data.accessToken,
			userId: data.user.id,
			levelName: 'sumsub-signin-demo-level',
			customization: { lang: data.langCode, theme: 'light' },
			onApplicantStatusChangedHandler
		});
	});
</script>

<div id="sumsub-websdk-container" />

<form
	method="post"
	action="/sign-up/identity"
	use:enhance
	bind:this={formRef}
	style="display: none;"
/>
