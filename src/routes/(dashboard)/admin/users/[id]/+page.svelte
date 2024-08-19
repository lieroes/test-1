<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const formatDate = (inputDate: Date, locale: string) => {
		return inputDate.toLocaleString(`${locale.toLowerCase()}-${locale.toUpperCase()}`, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: false
		});
	};

	const shortenId = (id: string) => id.substring(0, 13);

	function handleKeyPress(e: any) {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	}

	const { form, errors, submitting, enhance } = superForm(data.userDetailsForm);

	$: textContent = $page.data.langTexts.pages.adminEditUser;
	$: tableHeader = $page.data.langTexts.parts.tableHeader;
	$: transactionStatuses = $page.data.langTexts.parts.transactionStatuses;
</script>

<svelte:head>
	<title>{textContent.meta.title}</title>
</svelte:head>

<div class="member-wrapper__main profile-settings">
	<div class="main-card">
		<div class="main-card__body">
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<form action="?" method="post" use:enhance on:keydown={handleKeyPress}>
				<h1 class="main-card-title">{textContent.detailsTitle}</h1>
				<div class="main-card-content">
					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="" class="form-input__label">{textContent.id}</label>
						</div>
						<input value={data.userData.id} disabled class="form-input__input" />
					</div>

					<div class="form-input__wrapper">
						<div class="form-select__top">
							<label for="" class="form-input__label">{textContent.role}</label>
						</div>
						<div style="position: relative;">
							<select name="role" id="role" class="form-input__input" value={$form.role}>
								<option value={'USER'}>Default User</option>
								<option value={'ADMIN'}>Administrator</option>
							</select>

							<i
								class="icon icon-arrow-bottom"
								style="width: 18px; height: 18px; position: absolute; right: 15px; top: 15px; pointer-events: none; font-size: 18px"
							/>
						</div>
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="" class="form-input__label">{textContent.registrationDate}</label>
						</div>
						<input
							value={formatDate(data.userData.createdAt, data.langCode)}
							disabled
							class="form-input__input"
						/>
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="" class="form-input__label">{textContent.lastActionDate}</label>
						</div>
						<input
							value={formatDate(data.userData.updatedAt, data.langCode)}
							disabled
							class="form-input__input"
						/>
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="email" class="form-input__label">{textContent.email}</label>
						</div>
						<input id="email" name="email" value={$form.email} class="form-input__input" />
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="phone" class="form-input__label">{textContent.phone}</label>
						</div>
						<input id="phone" name="phone" value={$form.phone} class="form-input__input" />
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="firstName" class="form-input__label">{textContent.firstName}</label>
						</div>
						<input
							id="firstName"
							name="firstName"
							value={$form.firstName}
							class="form-input__input"
						/>
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="lastName" class="form-input__label">{textContent.lastName}</label>
						</div>
						<input id="lastName" name="lastName" value={$form.lastName} class="form-input__input" />
					</div>

					<div class="form-input__wrapper">
						<div class="form-select__top">
							<label for="gender" class="form-input__label">{textContent.gender}</label>
						</div>
						<div style="position: relative;">
							<select name="gender" id="gender" class="form-input__input" value={$form.gender}>
								<option value={'M'}>{textContent.male}</option>
								<option value={'F'}>{textContent.female}</option>
							</select>

							<i
								class="icon icon-arrow-bottom"
								style="width: 18px; height: 18px; position: absolute; right: 15px; top: 15px; pointer-events: none; font-size: 18px"
							/>
						</div>
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="dateOfBirth" class="form-input__label">{textContent.dateOfBirth}</label>
						</div>
						<input
							id="dateOfBirth"
							name="dateOfBirth"
							value={$form.dateOfBirth}
							class="form-input__input"
						/>
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="countryCode" class="form-input__label">{textContent.countryCode}</label>
						</div>
						<input
							id="countryCode"
							name="countryCode"
							value={$form.countryCode}
							class="form-input__input"
						/>
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="town" class="form-input__label">{textContent.town}</label>
						</div>
						<input id="town" name="town" value={$form.town} class="form-input__input" />
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="street" class="form-input__label">{textContent.street}</label>
						</div>
						<input id="street" name="street" value={$form.street} class="form-input__input" />
					</div>

					<div class="form-input__wrapper">
						<div class="form-input__top">
							<label for="formattedAddress" class="form-input__label"
								>{textContent.formattedAddress}</label
							>
						</div>
						<input
							id="formattedAddress"
							name="formattedAddress"
							value={$form.formattedAddress}
							class="form-input__input"
						/>
					</div>

					<h2 class="main-card-title" style="grid-column: 1/3; margin-top: 16px;">
						{textContent.passwordTitle}
					</h2>

					<div class="form-input__wrapper" class:has-error={$errors.password}>
						<div class="form-input__top">
							<label for="password" class="form-input__label">{textContent.password}</label>
						</div>
						<input
							type="password"
							id="password"
							name="password"
							bind:value={$form.password}
							class="form-input__input"
						/>
					</div>
					<div class="form-input__wrapper" class:has-error={$errors.passwordConfirm}>
						<div class="form-input__top">
							<label for="passwordConfirm" class="form-input__label"
								>{textContent.passwordConfirm}</label
							>
						</div>
						<input
							type="password"
							id="passwordConfirm"
							name="passwordConfirm"
							bind:value={$form.passwordConfirm}
							class="form-input__input"
						/>
					</div>
				</div>

				<div class="main-card-actions">
					<button type="submit" class="btn btn-primary btn-lg">
						{#if $submitting}
							Wait...
						{:else}
							{textContent.button}
						{/if}
					</button>
				</div>
			</form>
			</div>
		</div>
	</div>

<br />

<div class="member-table-card">
	<h2 class="main-card-title">{textContent.ordersTitle}</h2>
	<div class="member-table-card__body">
		<div class="tabs">
			<div role="tabpanel" class="tabpanel">
				<div>
					<div class="table-card-head">
						<div class="table-card-cell" style="width: 14%;">
							{tableHeader.date}
						</div>
						<div class="table-card-cell" style="width: 48%;">
							{tableHeader.operation}
						</div>
						<div class="table-card-cell" style="width: 23%;">
							{tableHeader.invoice}
						</div>
						<div class="table-card-cell" style="width: 15%;">
							{tableHeader.status}
						</div>
					</div>
					<div class="table-wrapper">
						{#if data.userData.orders.length === 0}
							<div class="no-transactions">
								User transactions not found
							</div>
						{/if}
						{#each data.userData.orders as order}
							<a href="/admin/transactions/{order.id}" class="table-card-row">
								<div class="table-card-cell">
									<span>{formatDate(order.createdAt, data.langCode)}</span>
								</div>
								<div class="table-card-cell">
									<div class="transaction-badge">
										<div class="icon-wrapper">
											<img
												src={order.exchangeType === 'fiat-crypto'
													? '/images/credit-card.svg'
													: `/images/coins/${order.fromCurrency.split(' ')[0].toLowerCase()}.svg`}
												width="16"
												height="16"
												loading="lazy"
												alt=""
											/>
										</div>
										<span>{order.fromAmount} {order.fromCurrency}</span>
									</div>
									<i class="icon-doublearrow"></i>
									<div class="transaction-badge">
										<div class="icon-wrapper">
											<img
												src={order.exchangeType === 'fiat-crypto'
													? `/images/coins/${order.toCurrency.split(' ')[0].toLowerCase()}.svg`
													: '/images/credit-card.svg'}
												width="16"
												height="16"
												loading="lazy"
												alt=""
											/>
										</div>
										<span>{order.toAmount} {order.toCurrency}</span>
									</div>
								</div>
								<div class="table-card-cell">
									<span>{shortenId(order.id)}</span>
								</div>
								<div class="table-card-cell">
									<div class="transaction-status">
										<span>
											{#if order.status === 0 || order.status === 1 || order.status === 2}
												<i class="icon icon-clock" />
											{:else if order.status === 3}
												<i class="icon icon-clock" />
											{:else if order.status === 4}
												<i class="icon icon-clock" />
											{:else if order.status === 5}
												<i class="icon icon-check-double" />
											{:else if order.status === 6}
												<i class="icon icon-close" />
											{/if}
										</span>
										<span class="no-mob">
											{transactionStatuses[order.status]}
										</span>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.member-wrapper__main {
		padding: 20px;
		color: #fff;
	}

	.main-card {
		background: #1a1a1a;
		border: 1px solid #333;
		border-radius: 10px;
		padding: 20px;
		margin-bottom: 20px;
	}

	.main-card__body {
		padding: 16px 0;
	}

	.main-card-title {
		font-size: 24px;
		margin-bottom: 20px;
	}

	.form-input__wrapper,
	.form-select__top {
		margin-bottom: 16px;
	}

	.form-input__top {
		margin-bottom: 8px;
	}

	.form-input__label {
		color: #b26fe7;
	}

	.form-input__input {
		width: 100%;
		padding: 10px;
		border: 1px solid #555;
		border-radius: 5px;
		background: #333;
		color: #fff;
	}

	.main-card-actions {
		padding: 24px 16px 0;
	}

	.btn-primary {
		background-color: #b26fe7;
		border: none;
		color: #fff;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
	}

	.member-table-card {
		background: none;
		color: #fff;
	}

	.table-card-head {
		display: flex;
		justify-content: space-between;
		padding: 8px;
		border-bottom: 1px solid #333;
		background: none;
	}

	.table-card-cell {
		flex: 1;
		text-align: left;
		padding: 8px;
		color: #b26fe7;
	}

	.table-wrapper {
		display: flex;
		flex-direction: column;
	}

	.table-card-row {
		display: flex;
		justify-content: space-between;
		padding: 8px;
		border-bottom: 1px solid #333;
		background: none;
		color: #fff;
		text-decoration: none;
		transition: background-color 0.2s ease;
	}

	.table-card-row:hover {
		background-color: #444;
	}

	.transaction-badge {
		display: flex;
		align-items: center;
	}

	.icon-wrapper {
		background-color: #fff;
		border-radius: 3px;
		padding: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 8px;
	}

	.icon-doublearrow {
		width: 20px;
		color: #b26fe7;
		margin: 0 8px;
	}

	.transaction-status {
		display: flex;
		align-items: center;
	}

	.icon {
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}

	.no-transactions {
		text-align: center;
		padding: 16px;
		font-size: 16px;
		color: #888;
	}
</style>
