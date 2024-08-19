<script lang="ts">
	export let title = 'Save, store, swap and spend your crypto';
	export let description =
		'Find competitive prices on Bitcoin, Dogecoin, Ethereum, Litecoin, Bitcoin Cash, XRP, ApeCoin and all major stablecoins.';
	export let buttonText = 'Get started';
</script>

<div class="promo-container">
	<div class="promo-content">
		<h1 class="promo-title">{title}</h1>
		<p class="promo-description">{description}</p>
		<button class="promo-button" on:click={() => (window.location.href = '/sign-up')}
			>{buttonText}</button
		>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');

	.promo-container {
		max-width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 40px;
		background-color: #000;
		color: #fff;
		overflow: hidden;
		width: 100%;
		margin: 0 auto;
		height: 700px;
		font-family: 'Roboto Mono', monospace;
		background-image: url('https://ifvzrnzet52veuty.public.blob.vercel-storage.com/mount-mCHZMTNdrUi8ISsBQKrccWhi6madDQ.gif');
		background-size: cover;
		background-position: center left 35%;
	}

	.promo-content {
		z-index: 1;
		max-width: 500px;
	}

	.promo-title {
		font-size: 36px;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.promo-description {
		font-size: 16px;
		margin-bottom: 30px;
		color: #9a9a9a;
	}

	.promo-button {
		padding: 12px 24px;
		background-color: #6200ea;
		border: none;
		border-radius: 5px;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.promo-button:hover {
		background-color: #3700b3;
	}

	@media (max-width: 768px) {
		.promo-container {
			flex-direction: column;
			padding: 20px;
			height: 700px;
            padding-top: 100px;
		}

		.promo-content {
			max-width: 100%;
			text-align: center;
			margin-bottom: 20px;
		}

		.promo-title {
			font-size: 24px;
		}

		.promo-description {
			font-size: 14px;
		}
	}
</style>
