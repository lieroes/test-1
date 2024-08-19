<script lang="ts">
    import { page } from '$app/stores';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import CopyButton from '$lib/components/CopyButton.svelte';
    import { onDestroy, onMount } from 'svelte';

    export let data: PageData;

    let timeout: NodeJS.Timeout;
    let redirectUrl: string | null = null;
    let isButtonDisabled: boolean = true;

    const { form, errors, submitting, enhance } = superForm(data.confirmForm);

    console.log('Initial data:', data);

    onMount(async () => {
        console.log('Component mounted.');
        console.log('Order data:', data.order);
        console.log('User data:', data.user);

        if (data.order.paymentMethod === 'safe-card') {
            const requestData = {
                orderId: data.order.id,
                userId: data.user.id,
                browser: {
                    user_agent: navigator.userAgent,
                    language: navigator.language,
                    color_depth: screen.colorDepth,
                    timezone: new Date().getTimezoneOffset(),
                    screen_height: screen.height,
                    screen_width: screen.width
                },
                ip_address: data.userIp,
                language: data.langCode
            };

            console.log('Sending request to /api/start-transaction with data:', requestData);

            try {
                const res = await fetch("/api/start-transaction", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });

                console.log('Response received from /api/start-transaction.');

                const resData = await res.json();
                console.log('Parsed response data from /api/start-transaction:', resData);

                if (resData.paymentUrl) {
                    redirectUrl = resData.paymentUrl;
                    console.log('Payment URL set to:', redirectUrl);
                } else {
                    console.error('No payment URL in response.');
                }
            } catch (error) {
                console.error('Error during fetch /api/start-transaction:', error);
            }
        } else {
            console.log('Payment method is not safe-card. Setting button disabled timeout.');
            timeout = setTimeout(() => {
                isButtonDisabled = false;
                console.log('Button is now enabled.');
            }, 5000);
        }
    });

    onDestroy(() => {
        console.log('Component destroyed. Clearing timeout.');
        clearTimeout(timeout);
    });

    $: textContent = $page.data.langTexts.pages.order.payment;
    console.log('Text content set:', textContent);
</script>

<div data-v-0b0797a5="">
    <h1 data-v-0e3ce062="" data-v-0b0797a5="" class="sales-funnel-title">{textContent.title}</h1>
    <br />
    <form action="?" method="post" use:enhance>
        <p style="font-size: 16px; text-align: center; margin-bottom: 16px;">
            {#if data.order.paymentMethod !== 'safe-card'}
                {#if textContent.subtitle}
                    {@html textContent.subtitle.replace(
                        '[ORDER_DATA]',
                        `${data.order.fromAmount} ${data.order.fromCurrency}`
                    )}
                {/if}
            {/if}
            {#if data.order.paymentMethod === 'safe-card'}
                {textContent.subtitlePaySafeCard}
            {/if}
        </p>
        <div data-v-49c05ea7="" data-v-0b0797a5="" class="address-qr-scanner">
            <div data-v-3ea2737a="" data-v-49c05ea7="" class="form-row mb-16 is-lg">
                {#if data.order.exchangeType === 'crypto-fiat' && data.order.paymentMethod === 'crypto'}
                    <div class="form-input__wrapper">
                        <div style="position: relative;">
                            <input
                                class="form-input__input"
                                readonly
                                style="text-align: center;"
                                value={data.cryptoRequisites?.address || ''}
                            />
                            <CopyButton text={data.cryptoRequisites?.address || ''} />
                        </div>
                    </div>
                {:else if data.order.exchangeType === 'fiat-crypto' && data.order.paymentMethod === 'credit-card'}
                    <div class="form-input__wrapper">
                        <div style="position: relative;">
                            <input
                                class="form-input__input"
                                readonly
                                style="text-align: center;"
                                value={data.fiatRequisites?.cardNumber || ''}
                            />
                            <CopyButton text={data.fiatRequisites?.cardNumber || ''} />
                        </div>
                    </div>
                {:else if data.order.exchangeType === 'fiat-crypto' && data.order.paymentMethod === 'bank-transfer'}
                    <div class="form-input__wrapper">
                        <div class="form-input__wrapper">
                            <div class="form-input__top">
                                <label for="" class="form-input__label">{textContent.iban}</label>
                            </div>
                            <div style="position: relative;">
                                <input class="form-input__input" readonly value={data.fiatRequisites?.iban || ''} />
                                <CopyButton text={data.fiatRequisites?.iban || ''} />
                            </div>
                        </div>

                        <br />
                        <div class="form-input__wrapper">
                            <div class="form-input__top">
                                <label for="firstName" class="form-input__label">{textContent.swift}</label>
                            </div>
                            <div style="position: relative;">
                                <input
                                    class="form-input__input"
                                    readonly
                                    value={data.fiatRequisites?.swift || ''}
                                />
                                <CopyButton text={data.fiatRequisites?.swift || ''} />
                            </div>
                        </div>

                        <br />
                        <div class="form-input__wrapper">
                            <div class="form-input__top">
                                <label for="firstName" class="form-input__label">{textContent.beneficiary}</label>
                            </div>
                            <div style="position: relative;">
                                <input
                                    class="form-input__input"
                                    readonly
                                    value={data.fiatRequisites?.beneficiary || ''}
                                />
                                <CopyButton text={data.fiatRequisites?.beneficiary || ''} />
                            </div>
                        </div>

                        <br />
                        <div class="form-input__wrapper">
                            <div class="form-input__top">
                                <label for="firstName" class="form-input__label"
                                    >{textContent.registrationNumber}</label
                                >
                            </div>
                            <div style="position: relative;">
                                <input
                                    class="form-input__input"
                                    readonly
                                    value={data.fiatRequisites?.registrationNumber || ''}
                                />
                                <CopyButton text={data.fiatRequisites?.registrationNumber || ''} />
                            </div>
                        </div>

                        <br />
                        <div class="form-input__wrapper">
                            <div class="form-input__top">
                                <label for="firstName" class="form-input__label"
                                    >{textContent.beneficiaryAddress}</label
                                >
                            </div>
                            <div style="position: relative;">
                                <input
                                    class="form-input__input"
                                    readonly
                                    value={data.fiatRequisites?.beneficiaryAddress || ''}
                                />
                                <CopyButton text={data.fiatRequisites?.beneficiaryAddress || ''} />
                            </div>
                        </div>

                        <br />
                        <div class="form-input__wrapper">
                            <div class="form-input__top">
                                <label for="firstName" class="form-input__label">{textContent.bank}</label>
                            </div>
                            <div style="position: relative;">
                                <input
                                    class="form-input__input"
                                    readonly
                                    value={data.fiatRequisites?.bankName || ''}
                                />
                                <CopyButton text={data.fiatRequisites?.bankName || ''} />
                            </div>
                        </div>

                        <br />
                        <div class="form-input__wrapper">
                            <div class="form-input__top">
                                <label for="firstName" class="form-input__label">
                                    {textContent.paymentReference}
                                </label>
                            </div>
                            <div style="position: relative;">
                                <input class="form-input__input" readonly value={`Transaction #${data.order.id}`} />
                                <CopyButton text={`Transaction #${data.order.id}`} />
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        <div data-v-05c4f620="" data-v-0b0797a5="" class="sales-funnel-actions" style="margin: 16px 0;">
            <div data-v-05c4f620="" class="sales-funnel-actions__submit">
                {#if data.order.paymentMethod !== 'safe-card'}
                    <button
                        data-v-0b0797a5=""
                        data-v-05c4f620=""
                        class="btn btn-lg btn-primary"
                        style="width: 100%;"
                        disabled={$submitting || isButtonDisabled}
                    >
                        {#if $submitting}
                            Wait...
                        {:else}
                            {textContent.button}
                        {/if}
                    </button>
                {:else}
                    <a href="{redirectUrl}" class="btn btn-lg btn-primary" style="width: 100%;">
                        {#if $submitting || !redirectUrl}
                            Wait...
                        {:else}
                            {textContent.buttonPaySafeCard}
                        {/if}
                    </a>
                {/if}
            </div>
        </div>
    </form>
</div>
