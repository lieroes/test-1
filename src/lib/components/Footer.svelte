<script lang="ts">
    import { page } from '$app/stores';
    $: textContent = $page.data.langTexts.sections.footer;
</script>

<footer class="new-footer">
    <div class="new-footer__inner">
        <div class="new-footer__row">
            <div class="new-footer-links__column">
                <div class="new-footer-links__group">
                    <h4 class="new-footer-links__group-title">{textContent.buy.title}</h4>
                    <ul class="new-footer-links__group-list">
                        {#each textContent.buy.items[0] as item}
                            <li>
                                <a class="new-footer-links__item" target="_blank" href={item.href} title={item.text}>
                                    {item.text}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <div class="new-footer-links__column">
                <div class="new-footer-links__group">
                    <h4 class="new-footer-links__group-title" style="visibility: hidden;">
                        {textContent.buy.title}
                    </h4>
                    <ul class="new-footer-links__group-list">
                        {#each textContent.buy.items[1] as item}
                            <li>
                                <a class="new-footer-links__item" target="_blank" href={item.href} title={item.text}>
                                    {item.text}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <!-- Sell Column -->
            <div class="new-footer-links__column">
                <div class="new-footer-links__group">
                    <h4 class="new-footer-links__group-title">{textContent.sell.title}</h4>
                    <ul class="new-footer-links__group-list">
                        {#each textContent.sell.items[0] as item}
                            <li>
                                <a class="new-footer-links__item" target="_blank" href={item.href} title={item.text}>
                                    {item.text}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <div class="new-footer-links__column">
                <div class="new-footer-links__group">
                    <h4 class="new-footer-links__group-title" style="visibility: hidden;">
                        {textContent.sell.title}
                    </h4>
                    <ul class="new-footer-links__group-list">
                        {#each textContent.sell.items[1] as item}
                            <li>
                                <a class="new-footer-links__item" target="_blank" href={item.href} title={item.text}>
                                    {item.text}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <!-- Company Column -->
            <div class="new-footer-links__column">
                <div class="new-footer-links__group">
                    <h4 class="new-footer-links__group-title">{textContent.company.title}</h4>
                    <ul class="new-footer-links__group-list">
                        {#each textContent.company.items as item}
                            <li>
                                <a class="new-footer-links__item" href={item.href} title={item.text}>{item.text}</a>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>

        <div class="new-footer__bottom-row">
            <div class="new-footer__contacts">
                <h4 class="new-footer-info__title">{textContent.contacts}</h4>
                <a href="mailto:info@cvetpay.com" class="new-footer-info__email">info@cvetpay.com</a>
            </div>

            <div class="new-footer__socials">
                <a href="https://www.instagram.com/cvetpay?igsh=ejdtYWVscWNmNDdt&utm_source=qr"><img src="/images/instagram-icon.svg" alt="Instagram" /></a>
                <a href="https://x.com/cvetpay"><img src="/images/twitter-icon.svg" alt="Twitter" /></a>
                <a href="https://t.me/cvetpay"><img src="/images/telegram.svg" alt="Telegram" /></a>
            </div>

            <div class="new-footer__payments">
                <img src="/images/visa-logo.svg" alt="Visa" />
                <img src="/images/mastercard-logo.svg" alt="MasterCard" />
            </div>
        </div>

        <div class="new-footer__legal">
            <p>© 2024, Cvetpay. All rights reserved.</p>
            <p>
                Cvetpay UAB is a company registered in Lithuania, registry code: 306920599, address A. Goštauto g. 8-224, LT-01108 Vilnius, Lithuania.
                Cvetpay UAB is registered under number 306920599 by the State Enterprise Centre of Registers of the Republic of Lithuania as a Virtual Currency Exchange Operator.
            </p>
            <p>Please examine the terms and conditions of the service and consult an expert if necessary.</p>
        </div>
    </div>
</footer>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

    .new-footer {
        background-color: #000;
        color: #fff;
        padding: 40px 0;
        font-family: 'Inter', sans-serif;
    }

    .new-footer__inner {
        margin: 0 auto;
        padding: 0 20px;
        max-width: 1200px;
    }

    .new-footer__row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-bottom: 40px;
    }

    .new-footer-links__column {
        flex: 1;
        min-width: 200px;
        margin-bottom: 30px;
    }

    .new-footer-links__group-title {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .new-footer-links__group-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .new-footer-links__item {
        display: block;
        color: #fff;
        text-decoration: none;
        margin-bottom: 10px;
        font-size: 18px;
        line-height: 1.5;
    }

    .new-footer-links__item:hover {
        text-decoration: underline;
    }

    .new-footer__contacts {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .new-footer-info__title {
        font-size: 22px;
        font-weight: bold;
        margin-right: 10px;
    }

    .new-footer-info__email {
        color: #fff;
        font-size: 20px;
        text-decoration: none;
    }

    .new-footer-info__email:hover {
        text-decoration: underline;
    }

    .new-footer__socials {
        display: flex;
        gap: 30px;
    }

    .new-footer__payments {
        display: flex;
        gap: 20px;
    }

    .new-footer__socials img {
        width: 30px;
        height: 30px;
    }

    .new-footer__payments img {
        width: 144px;
        height: 144px;
    }

    .new-footer__bottom-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .new-footer__legal {
        font-size: 14px;
        line-height: 1.6;
        color: #aaa;
        margin-top: 30px;
		text-align: center;
    }

    @media (max-width: 1024px) {
        .new-footer__socials img,
        .new-footer__payments img {
            width: 48px;
            height: 48px;
        }

        .new-footer__payments img {
            width: 120px;
            height: 120px;
        }
    }

    @media (max-width: 768px) {
        .new-footer__row {
            flex-direction: column;
            align-items: center;
        }

        .new-footer__bottom-row {
            flex-direction: column;
            align-items: center;
        }

        .new-footer-links__column {
            flex: 1 1 100%;
            margin-bottom: 20px;
            text-align: center;
        }

        .new-footer__socials,
        .new-footer__payments {
            justify-content: center;
        }

        .new-footer__socials img,
        .new-footer__payments img {
            width: 36px;
            height: 36px;
        }

        .new-footer__payments img {
            width: 96px;
            height: 96px;
        }
    }

    @media (max-width: 480px) {
        .new-footer-links__column {
            margin-bottom: 10px;
        }

        .new-footer__socials img,
        .new-footer__payments img {
            width: 24px;
            height: 24px;
        }

        .new-footer__payments img {
            width: 72px;
            height: 72px;
        }

        .new-footer-info__title,
        .new-footer-info__email {
            font-size: 16px;
        }
    }
</style>
