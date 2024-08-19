<script lang="ts">
	export let title = 'Spend like cash';
	export let description =
		'Turn crypto into dollars instantly. Load the Card from the spend online or in-store. Make contactless payments via Apple Pay and Google Pay. Buy gift cards in the app to use with Walmart, Uber and all of your favorite brands. Automatically earn cash back rewards on purchases.';
	export let buttonText = 'More';
</script>

<div class="feature-container">
	<div class="feature-image">
		<img src="/images/graphic.svg" alt="Feature Image" />
	</div>
	<div class="feature-content">
		<h1 class="feature-title">{title}</h1>
		<p class="feature-description">{description}</p>
		<button class="feature-button" on:click={() => (window.location.href = '/sign-up/identity')}
			>{buttonText}</button
		>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

	.feature-container {
		max-width: 1200px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40px;
		background-color: #000;
		color: #fff;
		overflow: hidden;
		width: 100%;
		margin: 0 auto;
		height: 700px;
		font-family: 'Inter', sans-serif;
	}

	.feature-content {
		z-index: 1;
		max-width: 500px;
	}

	.feature-title {
		font-size: 36px;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.feature-description {
		font-size: 16px;
		margin-bottom: 30px;
		color: #9a9a9a;
	}

	.feature-button {
		padding: 12px 24px;
		background-color: #6200ea;
		border: none;
		border-radius: 5px;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.feature-button:hover {
		background-color: #3700b3;
	}

	.feature-image {
		position: relative;
		width: 500px;
		height: auto;
	}

	.feature-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 768px) {
        .feature-description {
            text-align: justify;
        }
		.feature-container {
			flex-direction: column;
			padding: 20px;
			height: auto;
		}

		.feature-content {
			max-width: 100%;
			text-align: center;
			margin-bottom: 20px;
		}

		.feature-title {
			font-size: 24px;
		}

		.feature-description {
			font-size: 14px;
		}

		.feature-image {
			width: 100%;
			height: auto;
            margin-bottom: 40px;
		}

		.feature-image img {
			margin-top: 20px;
            width: 400px;
		}
	}
</style>
