<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from '$app/stores';

    $: textContent = $page.data.langTexts.sections.cookieBanner;
</script>

<div class="cookie-banner-wrapper">
    <div class="cookie-banner">
        <h3 class="cookie-banner__title">🍪 {textContent.title || "Cookie Policy"}</h3>
        <p class="cookie-banner__text">
            {textContent.text || "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies."}
            <a class="cookie-banner__link" href="/policies/terms-of-service" target="_blank">{textContent.link || "Learn more"}</a>
        </p>
        <form action="/?/acceptCookiePolicy" method="post" use:enhance>
            <button type="submit" class="cookie-banner__button">Accept 👍</button>
        </form>
    </div>
</div>

<style>
    .cookie-banner-wrapper {
        position: fixed;
        left: 50%;
        bottom: 30px;
        transform: translateX(-50%);
        z-index: 1000;
        padding: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .cookie-banner {
        padding: 20px;
        max-width: 500px;
        width: 100%;
        color: #fff;
        background-color: #6200ea;
        border: 2px solid #fff;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .cookie-banner__title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 12px;
    }

    .cookie-banner__text {
        font-size: 16px;
        font-weight: 300;
        margin-bottom: 16px;
    }

    .cookie-banner__link {
        text-decoration: underline;
        color: #00b57b;
        font-weight: bold;
    }

    .cookie-banner__button {
        display: inline-block;
        background-color: #fff;
        border-radius: 4px;
        padding: 12px 24px;
        color: #6200ea;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s linear, color 0.2s linear;
        border: none;
    }

    .cookie-banner__button:hover {
        background-color: #00b57b;
        color: #fff;
    }
</style>
