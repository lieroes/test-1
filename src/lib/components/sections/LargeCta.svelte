<script lang="ts">
	import { page } from '$app/stores';
	import IntersectionObserver from 'svelte-intersection-observer';

	let element;
	let intersecting;

	$: textContent = $page.data.langTexts.sections.ctaBlock;

	const handleIntersect = (event) => {
		console.log('Component is in view:', event.detail.isIntersecting);
		intersecting = event.detail.isIntersecting;
	};
</script>

<div class="cta-wrapper">
	<IntersectionObserver element={element} on:observe={handleIntersect}>
		<div bind:this={element} class="cta-section {intersecting ? 'visible' : ''}">
			<div class="cta-content">
				<h2 class="cta-title">{textContent.title}</h2>
				<p class="cta-text">{textContent.subtitle}</p>
				<a class="cta-button" href="/sign-up">{textContent.button}</a>
			</div>
			<div class="cta-image">
				<img src="https://ifvzrnzet52veuty.public.blob.vercel-storage.com/coin-ui7QxPOSe1EJDZLlJ0rpKRS9cZiDGk.gif" alt="Bitcoin Icon" />
			</div>
		</div>
	</IntersectionObserver>
</div>

<style>
	.cta-wrapper {
		overflow: hidden;
	}

	.cta-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #000;
		color: #fff;
		padding: 40px;
		padding-top: 150px;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
		transition: transform 1s ease-out, opacity 1s ease-out;
		opacity: 0;
		transform: translateX(-100%);
	}

	.cta-section.visible {
		opacity: 1;
		transform: translateX(0);
	}

	.cta-content {
		max-width: 50%;
	}

	.cta-title {
		font-size: 36px;
		margin-bottom: 20px;
	}

	.cta-text {
		font-size: 16px;
		margin-bottom: 30px;
	}

	.cta-button {
		display: inline-block;
		background-color: #8E24AA;
		color: #fff;
		padding: 12px 24px;
		font-size: 16px;
		border-radius: 8px;
		text-decoration: none;
	}

	.cta-image img {
		max-width: 100%;
		height: auto;
	}

	@media (max-width: 768px) {
		.cta-section {
			flex-direction: column;
			align-items: center;
			text-align: center;
			padding-top: 70px;
		}

		.cta-content {
			max-width: 100%;
			margin-bottom: 20px;
		}

		.cta-image {
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.cta-title {
			font-size: 24px;
		}

		.cta-text {
			font-size: 14px;
		}

		.cta-button {
			padding: 10px 20px;
			font-size: 14px;
		}
	}
</style>
