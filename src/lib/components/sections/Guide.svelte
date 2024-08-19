<script lang="ts">
	import { page } from '$app/stores';
	import IntersectionObserver from 'svelte-intersection-observer';

	let titleElement;
	let gifElement;
	let titleIntersecting = false;
	let gifIntersecting = false;

	const handleTitleIntersect = (event) => {
		titleIntersecting = event.detail.isIntersecting;
	};

	const handleGifIntersect = (event) => {
		gifIntersecting = event.detail.isIntersecting;
	};

	$: textContent = $page.data.langTexts.sections.guide;
</script>

<div id="quick-guide">
	<div class="container">
		<IntersectionObserver element={titleElement} on:observe={handleTitleIntersect}>
			<div bind:this={titleElement} class="guide-header {titleIntersecting ? 'visible' : ''}">
				<h2 class="guide-title">
					{textContent.header.title.part1} <span class="highlight">{textContent.header.title.highlighted}</span>
				</h2>
			</div>
		</IntersectionObserver>
		<div class="guide-content">
			<IntersectionObserver element={gifElement} on:observe={handleGifIntersect}>
				<div bind:this={gifElement} class="guide-image {gifIntersecting ? 'visible' : ''}">
					<img
						src="https://ifvzrnzet52veuty.public.blob.vercel-storage.com/ether-W30TC19X33VNDiTjPn00Nmv1p5v7Ic.gif"
						alt="Guide Image"
						class="guide-illustration"
					/>
				</div>
			</IntersectionObserver>
			<ol class="guide-steps">
				{#each textContent.items as item, index}
					<li
						class="guide-step {index == 0
							? 'small-left-margin'
							: index == 3
							? 'small-left-margin'
							: 'large-left-margin'}"
					>
						<span class="step-symbol">✓</span>
						<span class="step-title">{item.title}</span>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');

	#quick-guide {
		background-color: #0f1011;
		color: #fff;
		padding: 60px 20px;
		font-family: 'Roboto Mono', monospace;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		overflow: hidden;
	}

	.guide-header {
		width: 100%;
		margin-bottom: 40px;
		transform: translateX(100%);
		opacity: 0;
		transition: transform 1s ease-out, opacity 1s ease-out;
	}

	.guide-header.visible {
		transform: translateX(0);
		opacity: 1;
	}

	.guide-title {
		font-size: 24px;
		color: #fff;
	}

	.highlight {
		color: #b26fe7;
	}

	.guide-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	.guide-image {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
		transform: translateX(-100%);
		opacity: 0;
		transition: transform 1s ease-out, opacity 1s ease-out;
	}

	.guide-image.visible {
		transform: translateX(0);
		opacity: 1;
	}

	.guide-illustration {
		width: 100%;
		max-width: 500px;
		height: auto;
	}

	.guide-steps {
		width: 100%;
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.guide-step {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		text-align: justify;
	}

	.step-symbol {
		font-size: 36px;
		font-weight: bold;
		color: #b26fe7;
		margin-right: 20px;
	}

	.step-title {
		font-size: 14px;
		color: #fff;
	}

	.large-left-margin {
		margin-left: 0px;
	}

	@media (min-width: 768px) {
		.guide-content {
			flex-direction: row;
			align-items: center;
		}
		.guide-steps {
			flex-direction: column;
		}
		.small-left-margin {
			margin-left: 10px;
		}

		.large-left-margin {
			margin-left: 30px;
		}
	}

	@media (min-width: 1024px) {
		.guide-title {
			font-size: 36px;
		}
		.guide-steps {
			gap: 30px;
		}
		.step-symbol {
			font-size: 48px;
		}
		.step-title {
			font-size: 18px;
		}
		.small-left-margin {
			margin-left: 10px;
		}

		.large-left-margin {
			margin-left: 30px;
		}
	}
</style>
