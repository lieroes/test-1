<script lang="ts">
    import '$lib/styles/contacts.css';
    import type { PageData } from './$types';
    export let data: PageData;
    $: pageTexts = data.langTexts.pages.contacts;
</script>

<svelte:head>
    <title>{pageTexts.meta.title}</title>
</svelte:head>

<div class="contacts-container">
	<h1 class="contacts-heading">{pageTexts.heading}</h1>
	<p class="contacts-subheading">{pageTexts.subheading}</p>

	<div class="contacts-info">
		<div class="contacts-info__block">
			<span class="contacts-info__label">{pageTexts.info.country}</span>
			<span class="contacts-info__value">Poland</span>
		</div>
		<div class="contacts-info__block">
			<span class="contacts-info__label">{pageTexts.info.department}</span>
			<a href="mailto:pr@Cvetpay.com" class="contacts-info__link">pr@Cvetpay.com</a>
		</div>
		<div class="contacts-info__block">
			<span class="contacts-info__label">{pageTexts.info.address}</span>
			<span class="contacts-info__value">
				Aleja Jana Pawła II,<br />
				nr 43A, lok. 37B,<br />
				Warszawa, Poland
			</span>
		</div>
		<div class="contacts-info__block">
			<span class="contacts-info__label">{pageTexts.info.business}</span>
			<a href="mailto:business@name.com" class="contacts-info__link">business@name.com</a>
		</div>
	</div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

    .contacts-container {
        background-color: #000;
        color: #fff;
        font-family: 'Inter', sans-serif;
        padding: 60px;
        text-align: center;
        min-height: 100vh;
    }

    .contacts-heading {
        font-size: 36px;
        font-weight: 700;
        color: #8E24AA;
        margin-bottom: 40px;
    }

    .contacts-subheading {
        color: #ccc;
        font-size: 16px;
        margin-bottom: 60px;
    }

    .contacts-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }

    .contacts-info__block {
        background-color: transparent;
        padding: 30px;
        border-bottom: 2px solid;
        border-image: linear-gradient(to right, #8E24AA, #00008b) 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .contacts-info__label {
        font-family: 'Roboto Mono', monospace;
        font-size: 18px;
        font-weight: 700;
        color: #8E24AA;
    }

    .contacts-info__value, .contacts-info__link {
        font-size: 14px;
        color: #fff;
        text-align: right;
    }

    .contacts-info__link {
        color: #fff;
        text-decoration: none;
    }

    .contacts-info__link:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {

        .contacts-info {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        
        .contacts-heading {
            font-size: 24px;
        }

        .contacts-info__label {
            font-size: 24px;
        }

        .contacts-info__value {
            font-size: 14px;
        }

        .contacts-subheading {
            font-size: 14px;
        }
        .contacts-info {
            grid-template-columns: 1fr;
        }

        .contacts-info__block {
            flex-direction: column;
            text-align: center;
            border-bottom: 2px solid #8E24AA;
            width: 85%;
        }

        .contacts-info__block a {
            font-size: 14px;
        }

        .contacts-info__value, .contacts-info__link {
            text-align: center;
            margin-top: 10px;
        }
    }
</style>
