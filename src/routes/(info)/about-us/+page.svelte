<script lang="ts">
    import '$lib/styles/about-us.css';

    import type { PageData } from './$types';

    export let data: PageData;

    $: pageTexts = data.langTexts.pages.aboutUs;
</script>

<svelte:head>
    <title>{pageTexts.meta.title}</title>
</svelte:head>

<div class="header-inner">
    <h1 class="header-inner__heading">{pageTexts.heading}</h1>
</div>

<div class="about-page-content">
    <div class="about-text">
        <p>{@html pageTexts.text}</p>
    </div>

    <div class="contacts-info">
        <div class="contacts-info__block">
            <span class="contacts-info__label">{pageTexts.contacts.country}</span>
            <span class="contacts-info__value">{pageTexts.data.country}</span>
        </div>
        <div class="contacts-info__block">
            <span class="contacts-info__label">{pageTexts.contacts.prEmail}</span>
            <a href="mailto:pr@Cvetpay.com" class="contacts-info__link">pr@Cvetpay.com</a>
        </div>
        <div class="contacts-info__block">
            <span class="contacts-info__label">{pageTexts.contacts.address}</span>
            <span class="contacts-info__value">
                Aleja Jana Pawła II,
                nr 43A, lok. 37B,
                Warszawa, Poland
            </span>
        </div>
        <div class="contacts-info__block">
            <span class="contacts-info__label">{pageTexts.contacts.businessEmail}</span>
            <a href="mailto:business@name.com" class="contacts-info__link">business@name.com</a>
        </div>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');

    .header-inner {
        text-align: center;
        margin-bottom: 0px;
        background-color: #000;
        padding-bottom: 20px;
    }

    .header-inner__heading {
        font-size: 36px;
        color: #8E24AA;
        font-family: 'Roboto Mono', monospace;
    }

    .about-page-content {
        background-color: #000;
        color: #fff;
        font-family: 'Inter', sans-serif;
        padding: 40px;
        text-align: center;
        min-height: 100vh;
    }

    .about-text {
        font-size: 18px;
        margin-bottom: 40px;
        padding-left: 30%;
        padding-right: 30%;
        text-align: justify;
    }

    .contacts-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;
    }

    .contacts-info__block {
        width: 80%;
        display: flex;
        justify-content: space-between;
        background-color: transparent;
        border-bottom: 2px solid;
        border-image: linear-gradient(to right, #8E24AA, #000) 1;
        padding: 20px 0;
    }

    .contacts-info__label {
        color: #8E24AA;
        font-size: 20px;
        font-family: 'Roboto Mono', monospace;
    }

    .contacts-info__value, .contacts-info__link {
        color: #fff;
        font-size: 18px;
        font-family: 'Inter', sans-serif;
    }

    .contacts-info__link {
        color: white;
        text-decoration: none;
    }

    .contacts-info__link:hover {
        text-decoration: underline;
    }

    @media (max-width: 1200px) {
        .header-inner__heading {
            font-size: 32px;
        }

        .about-page-content {
            padding: 30px;
        }

        .about-text {
            font-size: 16px;
            padding-left: 20%;
            padding-right: 20%;
        }

        .contacts-info__block {
            width: 90%;
        }

        .contacts-info__label {
            font-size: 18px;
        }

        .contacts-info__value, .contacts-info__link {
            font-size: 16px;
        }
    }

    @media (max-width: 768px) {
        .header-inner__heading {
            font-size: 28px;
        }

        .about-page-content {
            padding: 20px;
        }

        .about-text {
            font-size: 14px;
            padding-left: 10%;
            padding-right: 10%;
        }

        .contacts-info__block {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

        .contacts-info__label, .contacts-info__value, .contacts-info__link {
            font-size: 14px;
        }
    }

    @media (max-width: 480px) {
        .header-inner__heading {
            font-size: 24px;
        }

        .about-page-content {
            padding: 10px;
        }

        .about-text {
            font-size: 12px;
            padding-left: 5%;
            padding-right: 5%;
        }

        .contacts-info__label, .contacts-info__value, .contacts-info__link {
            font-size: 12px;
        }
    }
</style>
