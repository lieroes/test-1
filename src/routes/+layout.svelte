<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	import '$lib/styles/common.css';
	import '$lib/styles/member.css';
	import '$lib/styles/icons.css';
	import '$lib/styles/form.css';
	import '$lib/styles/2388.css';
	import '$lib/styles/auth.css';
	import '$lib/styles/6587.css';
	import '$lib/styles/otp-signup.css';
	import '$lib/styles/home-page.css';
	import '$lib/styles/initial-data.css';
	import '$lib/styles/transactions-list.css';
	import '$lib/styles/transaction-flow.css';
	import '$lib/styles/2388.css';
	import '$lib/styles/443.css';
	import Footer from '$lib/components/Footer.svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';
	export let data: PageData;
</script>

<Navbar user={data?.user} />
<main class="main paybis-theme">
	<slot />
</main>
<Footer />

{#if !data.cookiePolicyAccepted && !$page.url.pathname.startsWith('/policies')}
	<CookieBanner />
{/if}
