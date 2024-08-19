<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { page } from '$app/stores';

    export let data: PageData;

    const {
        form: signInForm,
        errors: signInErrors,
        enhance: signInEnhance
    } = superForm(data.signInForm);

    $: textContent = $page.data.langTexts.pages.signIn;
</script>

<svelte:head>
    <title>{textContent.meta.title}</title>
</svelte:head>

<div class="auth-container active">
    <div class="auth-wrapper">
        <div class="auth-wrapper__inner">
            <div class="auth-wrapper__body">
                <div>
                    <form method="post" use:signInEnhance>
                        <div class="auth-app-header">{textContent.title}</div>
                        <div class="form-input__wrapper" class:has-error={$signInErrors._errors?.length > 0}>
                            <div class="form-input__top">
                                <label for="email" class="form-input__label">{textContent.email}</label>
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder=""
                                class="form-input__input"
                                bind:value={$signInForm.email}
                            />
                            <div class="form-input__comment" />
                        </div>
                        <br />
                        <div class="form-input__wrapper" class:has-error={$signInErrors._errors?.length > 0}>
                            <div class="form-input__top">
                                <label for="password" class="form-input__label">{textContent.password}</label>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder=""
                                class="form-input__input"
                                bind:value={$signInForm.password}
                            />
                            <div class="form-input__comment" />
                        </div>

                        <div class="auth-app-footer">
                            <button type="submit" class="btn btn-primary btn-lg">{textContent.button}</button>
                            <button type="button" class="btn btn-secondary btn-lg">
                                <a href="/sign-up" class="btn-link">{textContent.registerLink}</a>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

    .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #000;
        color: #fff;
        font-family: "Roboto Mono", monospace;
        padding: 20px;
        margin-top: 0;
        margin-bottom: 0;
    }

    .auth-wrapper {
        background-color: transparent;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        width: 40%;
    }

    .auth-wrapper__inner {
        display: flex;
        flex-direction: column;
    }

    .auth-wrapper__body {
        width: 100%;
    }

    .auth-app-header {
        font-size: 33px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 20px;
        color: #8e24aa;
        font-family: "Roboto Mono", monospace;
    }

    .form-input__wrapper {
        margin-bottom: 20px;
    }

    .form-input__top {
        margin-bottom: 5px;
    }

    .form-input__label {
        font-size: 14px;
        color: #ccc;
    }

    .form-input__input {
        width: 100%;
        padding: 10px;
        border: 1px solid #8e24aa;
        border-radius: 5px;
        background-color: #1c1c1c;
        color: #fff;
        font-size: 14px;
        font-family: "Roboto Mono", monospace;
    }

    .form-input__input::placeholder {
        color: #666;
    }

    .auth-app-footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .btn {
        display: inline-block;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        text-align: center;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.3s;
        font-family: "Roboto Mono", monospace;
        margin-bottom: 10px;
    }

    .btn-primary {
        background-color: #8e24aa;
        color: #fff;
        border: none;
    }

    .btn-primary:hover {
        background-color: #7321a1;
    }

    .btn-secondary {
        border: 1px solid white;
        background-color: transparent;
        color: #fff;
    }

    .btn-secondary:hover {
        background-color: #7321a1;
    }

    .auth-app-footer__secondary {
        margin-top: 10px;
        font-size: 14px;
        color: #ccc;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-app-footer__secondary .forgot-password-link,
    .auth-app-footer__secondary .btn-link {
        color: #8e24aa;
        text-decoration: none;
        margin: 5px 0;
    }

    .auth-app-footer__secondary .btn-link {
        color: #fff;
        border: 1px solid #8e24aa;
        padding: 5px 10px;
        border-radius: 5px;
        margin-top: 10px;
    }

    .auth-app-footer__secondary .btn-link:hover {
        border-color: #7321a1;
    }

    @media (max-width: 1200px) {
        .auth-wrapper {
            width: 60%;
        }

        .auth-app-header {
            font-size: 28px;
        }

        .form-input__label,
        .form-input__input {
            font-size: 16px;
        }
    }

    @media (max-width: 768px) {
        .auth-wrapper {
            width: 80%;
            padding: 30px;
        }

        .auth-app-header {
            font-size: 24px;
        }

        .form-input__label,
        .form-input__input {
            font-size: 14px;
        }

        .auth-app-footer {
            flex-direction: column;
        }
    }

    @media (max-width: 480px) {
        .auth-wrapper {
            width: 100%;
            padding: 20px;
        }

        .auth-app-header {
            font-size: 20px;
        }

        .form-input__label,
        .form-input__input {
            font-size: 12px;
        }
    }
</style>
