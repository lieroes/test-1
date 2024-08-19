<script lang="ts">
	import { page } from '$app/stores';
	import IntersectionObserver from 'svelte-intersection-observer';

	let titleElement;
	let textElement;
	let buttonElement;
	let titleIntersecting = false;
	let textIntersecting = false;
	let buttonIntersecting = false;

	$: textContent = $page.data.langTexts.sections.ctaBlock;
</script>

<div class="cta-block-new">
	<IntersectionObserver element={titleElement} bind:intersecting={titleIntersecting}>
		<h4 bind:this={titleElement} class="cta-block-new__title {titleIntersecting ? 'visible' : ''}">{textContent.title}</h4>
	</IntersectionObserver>
	<IntersectionObserver element={textElement} bind:intersecting={textIntersecting}>
		<div bind:this={textElement} class="cta-block-new__text {textIntersecting ? 'visible' : ''}">{textContent.subtitle}</div>
	</IntersectionObserver>
	<IntersectionObserver element={buttonElement} bind:intersecting={buttonIntersecting}>
		<a bind:this={buttonElement} class="cta-block-new__button {buttonIntersecting ? 'visible' : ''}" href="/feed-back">{textContent.button}</a>
	</IntersectionObserver>
</div>

<style>
	.cta-block-new {
		background-color: #141414;
		padding: 40px 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}

	.cta-block-new__title {
		color: #ffffff;
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 20px;
		transform: translateX(100%);
		opacity: 0;
		transition: transform 1s ease-out, opacity 1s ease-out;
	}

	.cta-block-new__title.visible {
		transform: translateX(0);
		opacity: 1;
	}

	.cta-block-new__text {
		color: #a0a0a0;
		margin-bottom: 30px;
		max-width: 400px;
		width: 100%;
		transform: translateX(100%);
		opacity: 0;
		transition: transform 1s ease-out, opacity 1s ease-out;
	}

	.cta-block-new__text.visible {
		transform: translateX(0);
		opacity: 1;
	}

	.cta-block-new__button {
		background-color: #9b59b6;
		color: #ffffff;
		padding: 10px 20px;
		border: none;
		border-radius: 4px;
		text-decoration: none;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
		transform: translateX(-100%);
		opacity: 0;
		transition: transform 1s ease-out, opacity 1s ease-out;
	}

	.cta-block-new__button.visible {
		transform: translateX(0);
		opacity: 1;
	}

	.cta-block-new__button:hover {
		background-color: #8e44ad;
	}

	@media (max-width: 768px) {
		.cta-block-new__text {
			width: 90%;
			margin-left: 0;
		}
	}
</style>
