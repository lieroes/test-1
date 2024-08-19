<script lang="ts">
	import { page } from '$app/stores';
	$: textContent = $page.data.langTexts.sections.features;
</script>

<div id="our-features" class="benefits">
	<div class="container">
		<h2 class="benefits-title">
			{textContent.title.part1} <span class="highlight">{textContent.title.highlighted}</span>
		</h2>

		<div class="benefits-wrapper">
			<div class="benefits-item">
				<img
					class="benefits-item__icon"
					loading="lazy"
					src="/images/features/quick-payouts.svg"
					alt="Quick Payouts"
				/>
				<h5 class="benefits-item__title">{textContent.items[0].title}</h5>
				<p class="benefits-item__dscr">{textContent.items[0].text}</p>
			</div>
			<div class="benefits-item">
				<img
					class="benefits-item__icon"
					loading="lazy"
					src="/images/features/support.svg"
					alt="Support"
				/>
				<h5 class="benefits-item__title">{textContent.items[1].title}</h5>
				<p class="benefits-item__dscr">{textContent.items[1].text}</p>
			</div>
			<div class="benefits-item">
				<img
					class="benefits-item__icon"
					loading="lazy"
					src="/images/features/available-worldwide.svg"
					alt="Available Worldwide"
				/>
				<h5 class="benefits-item__title">{textContent.items[2].title}</h5>
				<p class="benefits-item__dscr">{textContent.items[2].text}</p>
			</div>
			<div class="benefits-item">
				<img
					class="benefits-item__icon"
					loading="lazy"
					src="/images/features/efficient-fast-service.svg"
					alt="Efficient Fast Service"
				/>
				<h5 class="benefits-item__title">{textContent.items[3].title}</h5>
				<p class="benefits-item__dscr">{textContent.items[3].text}</p>
			</div>
			<div class="benefits-item">
				<img
					class="benefits-item__icon"
					loading="lazy"
					src="/images/features/effortless-verification.svg"
					alt="Effortless Verification"
				/>
				<h5 class="benefits-item__title">{textContent.items[4].title}</h5>
				<p class="benefits-item__dscr">{textContent.items[4].text}</p>
			</div>
			<div class="benefits-item">
				<img
					class="benefits-item__icon"
					loading="lazy"
					src="/images/features/low-commissions.svg"
					alt="Low Commissions"
				/>
				<h5 class="benefits-item__title">{textContent.items[5].title}</h5>
				<p class="benefits-item__dscr">{textContent.items[5].text}</p>
			</div>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

	#our-features {
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

	.benefits-title {
		color: #ffffff;
		text-align: center;
		margin-bottom: 40px;
		font-size: 2.5rem;
	}

	.benefits-title .highlight {
		color: #8237bc;
	}

	.benefits-wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.benefits-item {
		background-color: #282828;
		border-radius: 8px;
		padding: 20px;
		margin-bottom: 20px;
		text-align: center;
		width: calc(33.333% - 40px);
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid rgb(168, 168, 168);
	}

	.benefits-item__icon {
		width: 100px;
		height: 100px;
		margin-top: -60px;
		margin-bottom: 10px;
	}

	.benefits-item__title {
		color: #b3b3b3;
		font-size: 1.25rem;
		margin-bottom: 10px;
		color: #b26fe7;
	}

	.benefits-item__dscr {
		color: #b3b3b3;
		font-size: 1rem;
		margin: 0;
	}

	@media (max-width: 1024px) {
		.benefits-item {
			width: calc(50% - 30px);
		}

		.benefits-item__icon {
			margin-top: -50px;
		}
	}

	@media (max-width: 768px) {
		.benefits-title {
			font-size: 2rem;
		}

		.benefits-item {
			width: calc(50% - 20px);
		}

		.benefits-item__icon {
			width: 80px;
			height: 80px;
		}

		.benefits-item__title {
			font-size: 1rem;
		}

		.benefits-item__dscr {
			font-size: 0.875rem;
		}
	}

	@media (max-width: 1100px) {
		.benefits-wrapper {
			flex-direction: column;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.benefits-item {
			width: 100%;
			max-width: 300px;
		}

		.benefits-item__icon {
			width: 60px;
			height: 60px;
			margin-top: -40px;
		}

		.benefits-item__title {
			font-size: 0.875rem;
		}

		.benefits-item__dscr {
			font-size: 0.75rem;
		}
	}
</style>
