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
		console.log("Data received on mount:", data);
		console.log("AccessToken before launchWebSdk:", data.accessToken);
		console.log("AccessToken Type before launchWebSdk:", typeof data.accessToken);

		launchWebSdk({
			selector: '#sumsub-websdk-container',
			accessToken: data.accessToken,
			userId: data.order.id,
			levelName: 'order-identity-verification',
			customization: { lang: data.langCode, theme: 'light' },
			onApplicantStatusChangedHandler
		});
	});
</script>

<div id="sumsub-websdk-container"></div>
<form method="post" action="?" use:enhance bind:this={formRef} style="display: none;"></form>
