<script>
	import FeedCta from '$lib/components/sections/FeedCta.svelte';
	import MoreCta from '$lib/components/sections/MoreCta.svelte';
	import { enhance } from '$app/forms';

	let errors = {};
	let showPopup = false;

	const handleSubmit = async (event) => {
		const formData = new FormData(event.target);
		const name = formData.get('name');
		const email = formData.get('email');
		const phone = formData.get('phone');
		const message = formData.get('message');

		errors = {};

		if (!name) errors.name = true;
		if (!email) errors.email = true;
		if (!phone) errors.phone = true;
		if (!message) errors.message = true;

		if (Object.keys(errors).length === 0) {
			const response = await fetch('/api/submit-feedback', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				showPopup = true;
				setTimeout(() => (showPopup = false), 3000);
				event.target.reset();
			} else {
				const result = await response.json();
				errors = result.errors || {};
			}
		}
	};
</script>

<main>
    <FeedCta />
    <MoreCta />
	<section class="feedback-section">
		<div class="feedback-container">
			<div class="feedback-left">
				<div class="feedback-text">
					<h2 class="feedback-title">
						Leave a request for a <span class="highlight">consultation</span>
					</h2>
					<p class="feedback-description">
						Please leave a consultation request so that our specialists can contact you to discuss
						your needs in detail and provide qualified advice. This will help us understand your
						requests and offer the best solutions that meet your requirements.
					</p>
				</div>
				<img src="/images/formarrow.svg" alt="Arrow" class="feedback-arrow" />
			</div>
			<div class="feedback-right">
				<form class="feedback-form" on:submit|preventDefault={handleSubmit}>
					<label for="name">Name</label>
					<input type="text" id="name" name="name" class={errors.name ? 'error' : ''} required />

					<label for="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						class={errors.email ? 'error' : ''}
						required
					/>

					<label for="phone">Phone</label>
					<input type="text" id="phone" name="phone" class={errors.phone ? 'error' : ''} required />

					<label for="message">Message</label>
					<textarea id="message" name="message" class={errors.message ? 'error' : ''} required />

					<button type="submit">Order</button>
				</form>
			</div>
		</div>
	</section>
	{#if showPopup}
		<div class="popup">
			<p>Message sent successfully!</p>
			<button on:click={() => (showPopup = false)}>Close</button>
		</div>
	{/if}
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

	main {
		padding: 0;
		margin: 0 auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #000;
		font-family: 'Inter', sans-serif;
	}

	input {
		border: 2px solid #b26fe7 !important;
	}

    textarea {
        border: 2px solid #b26fe7 !important;
    }

    label {
        color: #b26fe7 !important;
    }

	.feedback-section {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 40px 20px;
		background-color: #000;
	}

	.feedback-container {
		display: flex;
		width: 100%;
		max-width: 1200px;
		background-color: #000;
		border-radius: 10px;
		overflow: hidden;
	}

	.feedback-left {
		flex: 1;
		color: #fff;
		padding: 40px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}

	.feedback-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.feedback-title {
		font-size: 2em;
		font-weight: bold;
		margin-bottom: 20px;
		color: #fff;
	}

	.highlight {
		color: #b26fe7;
	}

	.feedback-description {
		font-size: 1.2em;
		color: #aaa;
	}

	.feedback-arrow {
		width: 150px;
		height: auto;
		margin-top: 20px;
	}

	.feedback-right {
		flex: 1;
		padding: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border: 3px solid #444;
		border-radius: 10px;
		background-color: #1e1e1e;
        overflow: visible;
	}

	.feedback-form {
		display: flex;
		flex-direction: column;
	}

	.feedback-form label {
		font-size: 1em;
		color: #999;
		margin-bottom: 5px;
	}

	.feedback-form input,
	.feedback-form textarea {
		width: 100%;
		padding: 10px;
		margin-bottom: 20px;
		border: 1px solid #444;
		border-radius: 5px;
		font-size: 1em;
		color: #fff;
		background-color: #333;
	}

	.feedback-form input.error,
	.feedback-form textarea.error {
		border-color: red;
	}

	.feedback-form textarea {
		resize: vertical;
		height: 100px;
	}

	.feedback-form button {
		padding: 12px 24px;
		background-color: #b26fe7;
		border: none;
		border-radius: 5px;
		color: #fff;
		font-size: 1em;
		cursor: pointer;
		transition: background-color 0.3s ease;
        width: 40%;
        align-self: center;
        margin-bottom: -45px;
        margin-top: 10px;
        z-index: 200;
	}

	.feedback-form button:hover {
		background-color: #8e44ad;
	}

	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
		color: #000;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		width: 300px;
		text-align: center;
		min-width: 300px;
		min-height: 100px;
		height: 140px;
	}

	.popup p {
		margin: 0 0 20px 0;
	}

	.popup button {
		padding: 10px 20px;
		background-color: #b26fe7;
		border: none;
		border-radius: 5px;
		color: #fff;
		font-size: 1em;
		cursor: pointer;
	}

	.popup button:hover {
		background-color: #8e44ad;
	}

	@media (max-width: 768px) {

        .feedback-form button {
		padding: 12px 24px;
		background-color: #b26fe7;
		border: none;
		border-radius: 5px;
		color: #fff;
		font-size: 1em;
		cursor: pointer;
		transition: background-color 0.3s ease;
        width: 40%;
        align-self: center;
        margin-bottom: -30px;
        margin-top: 10px;
        z-index: 200;
	}
		.feedback-container {
			flex-direction: column;
		}

		.feedback-left,
		.feedback-right {
			padding: 20px;
		}

		.feedback-title {
			font-size: 1.5em;
		}

		.feedback-description {
			font-size: 1em;
		}

		.feedback-arrow {
			width: 50px;
		}
	}
</style>
