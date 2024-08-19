<script lang="ts">
	import '$lib/styles/static-pages.css';
	import { page } from '$app/stores';

	$: pageTexts = $page.data.langTexts.pages[$page.url.pathname.replace('/policies/', '')];
</script>

<svelte:head>
	<title>{pageTexts.meta.title}</title>
</svelte:head>

<div class="header-inner">
	<h1 class="header-inner__heading">{pageTexts.heading}</h1>
</div>

<div class="container">
	<div class="static-wrapper">
		<div class="static-wrapper__nav">
			<div class="static-inner-nav">
				<a
					class="static-inner-nav__list-item"
					class:is-selected={$page.url.pathname.includes('/terms-of-use')}
					href="/policies/terms-of-use/"
				>
					{pageTexts.sidebar.items[0]}
				</a>
				<a
					class="static-inner-nav__list-item"
					class:is-selected={$page.url.pathname.includes('/privacy-policy')}
					href="/policies/privacy-policy/"
				>
					{pageTexts.sidebar.items[1]}
				</a>
				<a
					class="static-inner-nav__list-item"
					class:is-selected={$page.url.pathname.includes('/aml-kyc-policy')}
					href="/policies/aml-kyc-policy/"
				>
					{pageTexts.sidebar.items[2]}
				</a>
				<a
					class="static-inner-nav__list-item"
					class:is-selected={$page.url.pathname.includes('/public-offer')}
					href="/policies/public-offer/"
				>
					{pageTexts.sidebar.items[3]}
				</a>
				<a
					class="static-inner-nav__list-item"
					class:is-selected={$page.url.pathname.includes('/cookies-policy')}
					href="/policies/cookies-policy/"
				>
					{pageTexts.sidebar.items[4]}
				</a>
				<a
					class="static-inner-nav__list-item"
					class:is-selected={$page.url.pathname.includes('/dispute-resolution')}
					href="/policies/dispute-resolution/"
				>
					{pageTexts.sidebar.items[5]}
				</a>
				<a
					class="static-inner-nav__list-item"
					class:is-selected={$page.url.pathname.includes('/risk-disclosure')}
					href="/policies/risk-disclosure/"
				>
					{pageTexts.sidebar.items[6]}
				</a>
			</div>
		</div>
		<div class="static-wrapper__main is-centered">
			<slot />
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');

	body {
		background-color: #000;
		color: #fff;
		font-family: 'Roboto Mono', monospace;
		margin: 0;
		padding: 0;
		width: 100%;
		overflow-x: hidden; /* Ensure no horizontal scroll */
	}

	.header-inner {
		text-align: center;
		padding: 20px 0;
		background-color: #000;
		color: #fff;
	}

	.header-inner__heading {
		font-size: 48px;
		font-weight: 700;
		color: #fff;
	}

	.container {
		display: flex;
		justify-content: center;
		padding: 20px;
		background-color: #000;
		color: #fff;
		box-sizing: border-box;
	}

	.static-wrapper {
		display: flex;
		width: 100%;
		max-width: 1200px;
		flex-direction: column;
		align-items: center;
	}

	.static-wrapper__nav {
		width: 100%;
		display: flex;
		justify-content: center;
		padding-bottom: 20px;
		border-bottom: 1px solid #444;
	}

	.static-inner-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.static-inner-nav__list-item {
		padding: 10px 20px;
		border: 1px solid #444;
		border-radius: 25px;
		text-align: center;
		color: #fff;
		text-decoration: none;
		transition: background-color 0.3s;
		font-size: 18px;
	}

	.static-inner-nav__list-item:hover {
		background-color: #1c1c1c;
	}

	.static-inner-nav__list-item.is-selected {
		background-color: #8e24aa;
		border-color: #8e24aa;
	}

	.static-wrapper__main {
		width: 75%;
		padding: 20px;
		background-color: transparent;
		border-radius: 5px;
		color: #ccc;
		margin-top: 20px;
		text-align: left;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 0;
	}

	.text-block p {
		text-align: justify;
	}

	.static-wrapper__main h2,
	.static-wrapper__main p {
		margin-bottom: 20px;
	}
</style>
