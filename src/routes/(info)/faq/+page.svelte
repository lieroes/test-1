<script lang="ts">
	import '$lib/styles/faq.css';
	import type { PageData } from './$types';

	export let data: PageData;

	let isDropdownOpened: boolean[] = [];
	const toggleDropdown = (index: number) => (isDropdownOpened[index] = !isDropdownOpened[index]);

	$: pageTexts = data.langTexts.pages.faq;
</script>

<svelte:head>
	<title>{pageTexts.meta.title}</title>
</svelte:head>

<div
	class="header-inner has-background"
	style="background-image: url('/images/backgrounds/faq-bg.svg')"
>
	<h1 class="header-inner__heading">{pageTexts.heading}</h1>
</div>
<div class="faq-feed">
	<div class="faq-selection__header" />
	<div class="faq-selection">
		<div id="faq-selection-list" class="list-view">
			{#each pageTexts.items as item, index}
				<div class="faq-item" class:is-open={isDropdownOpened[index]}>
					<div class="faq-item__heading">
						<button class="faq-item__toggle" on:click={() => toggleDropdown(index)}>
							<p>{item.title}</p>
						</button>
					</div>
					<div class="faq-item__accordion">
						<div class="faq-item__content">
							<div class="text-block">
								<p class="text-block-content">
									{@html item.text}
								</p>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

	.header-inner {
		padding: 20px;
		padding-top: 100px;
		padding-bottom: 0;
		margin-bottom: 0;
		background-color: #000;
		color: #fff;
		text-align: center;
		font-family: 'Inter', sans-serif;
	}

	.header-inner__heading {
		font-size: 2.5rem;
		font-weight: 700;
		color: #8e24aa;
	}

	.faq-feed {
		padding: 20px;
		padding-bottom: 150px;
		background-color: #000;
		color: #fff;
		font-family: 'Inter', sans-serif;
	}

	.faq-item {
		border-bottom: 1px solid #444;
		margin-bottom: 10px;
		color: red;
	}

	.faq-item__heading {
		background-color: #000;
		color: #fff;
		padding: 10px;
		cursor: pointer;
		font-size: 1.25rem;
		font-weight: 500;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.faq-item__heading:hover {
		background-color: #1c1c1c;
	}

	.faq-item__toggle {
		background: none;
		border: none;
		color: #fff;
		font-size: 1.25rem;
		width: 100%;
		text-align: left;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.faq-item__accordion {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.2s ease-out;
	}

	.faq-item.is-open .faq-item__accordion {
		max-height: 500px; /* Adjust based on your content */
		transition: max-height 0.3s ease-in;
	}

	.faq-item__content {
		background-color: #1c1c1c;
		padding: 10px;
		color: #ccc;
	}

	.text-block-content {
		margin: 0;
		font-size: 1rem;
	}

	.faq-item.is-open .faq-item__toggle p {
		color: #8e24aa;
	}

	@media (max-width: 768px) {
		.header-inner__heading {
			font-size: 2rem;
		}

		.faq-item__heading {
			font-size: 1rem;
		}

		.faq-item__toggle {
			font-size: 1rem;
		}
	}
</style>
