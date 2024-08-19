<script lang="ts">
	import { page } from '$app/stores';

	let isDropdownOpened: boolean[] = [];
	const toggleDropdown = (index: number) => (isDropdownOpened[index] = !isDropdownOpened[index]);

	$: textContent = $page.data.langTexts.sections.frequentQuestions;
</script>

<div id="popular-faq">
	<div class="accordion">
		<div class="container">
			<h2 class="accordion__title"><a href="/faq/">{textContent.title}</a></h2>
			<div class="accordion__main">
				<div class="accordion__main-inner">
					{#each textContent.items as item, index}
						<div class="accordion-item">
							<button
								class:is-open={isDropdownOpened[index]}
								class="accordion-item__toggle"
								on:click={() => toggleDropdown(index)}
							>
								{item.title}
							</button>
							<div class="accordion-item__content-wrapper">
								<div class="accordion-item__content">
									<div class="text-block">
										<p>
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
	</div>
</div>

<style>
	#popular-faq {
		background-color: #181818;
		padding: 60px 20px; 
		display: flex;
		justify-content: center; 
	}

	.container {
		max-width: 1200px;
		width: 100%;
		box-sizing: border-box;
	}

	.accordion__title {
		color: #8237BC; 
		text-align: left;
		margin-bottom: 40px;
		font-size: 3rem;
	}

	.accordion__main-inner {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.accordion-item {
		background-color: #282828;
		border-radius: 8px;
		padding: 20px;
		border: 1px solid rgb(168, 168, 168);
	}

	.accordion-item__toggle {
		background: none;
		border: none;
		color: #b3b3b3;
		font-size: 1.25rem;
		width: 100%;
		text-align: left;
		cursor: pointer;
	}

	.accordion-item__toggle.is-open::after {
		content: "▲";
		float: right;
		color: #B26FE7;
	}

	.accordion-item__toggle::after {
		content: "▼";
		float: right;
		color: #B26FE7;
	}

	.accordion-item__content-wrapper {
		display: none;
	}

	.accordion-item__toggle.is-open + .accordion-item__content-wrapper {
		display: block;
	}

	.accordion-item__content {
		margin-top: 10px;
		color: #b3b3b3;
	}

	.text-block p {
		text-align: justify;
		margin: 0;
	}
</style>
