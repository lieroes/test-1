<script lang="ts">
	import { page } from '$app/stores';
	export let transactionsList: any;

	const formatDate = (inputDate: Date, locale: string) => {
		const formattedDate = inputDate
			.toLocaleString(`${locale.toLowerCase()}-${locale.toUpperCase()}`, {
				year: 'numeric',
				month: 'short',
				day: '2-digit',
				hour: 'numeric',
				minute: 'numeric',
				hour12: false
			})
			.split(', ');
		return ` ${formattedDate[2]}`;
	};

	$: textContent = $page.data.langTexts.sections.transactions;
</script>

<div class="transactions-preview">
	<div class="container">
		<div class="transactions-preview__header">
			<h2 class="transactions-preview__header-title">{textContent.title}</h2>
			<p class="transactions-preview__header-subtitle">{textContent.subtitle}</p>
		</div>
		<div id="latest-transactions-wrapper">
			<div class="transactions-preview__main">
				<ul class="transactions-preview__list">
					{#each transactionsList as item}
						<li class="transactions-preview-item">
							<div class="transactions-preview-item__item">
								<div class="transactions-preview-item__icon-box">
									<div class="transactions-preview-item__icon">
										<img
											src={item.exchangeType === 'fiat-crypto'
												? '/images/credit-card.svg'
												: `/images/coins/${item.fromCurrency.split(' ')[0].toLowerCase()}.svg`}
											loading="lazy"
											width="16"
											height="16"
											alt=""
										/>
									</div>
								</div>
								<div class="transactions-preview-item__main">
									<span>
										<div class="transactions-preview-item__label">
											{#if item.exchangeType === 'fiat-crypto'}
												Credit/Debit Card
											{:else}
												Crypto
											{/if}
										</div>
										<div class="transactions-preview-item__value">
											{item.fromAmount}
											{item.fromCurrency}
										</div>
									</span>
								</div>
							</div>

							<div class="transactions-preview-item__item">
								<div class="transactions-preview-item__icon-box">
									<div class="transactions-preview-item__icon">
										<div class="transactions-preview-item__icon">
											<img
												src={item.exchangeType === 'fiat-crypto'
													? `/images/coins/${item.toCurrency.split(' ')[0].toLowerCase()}.svg`
													: '/images/credit-card.svg'}
												loading="lazy"
												width="16"
												height="16"
												alt=""
											/>
										</div>
									</div>
								</div>
								<div class="transactions-preview-item__main">
									<span>
										<div class="transactions-preview-item__label">
											{#if item.exchangeType === 'fiat-crypto'}
												Crypto
											{:else}
												Credit/Debit Card
											{/if}
										</div>
										<div class="transactions-preview-item__value">
											{item.toAmount}
											{item.toCurrency}
										</div>
									</span>
								</div>
							</div>

							<div class="transactions-preview-item__time">{formatDate(item.createdAt, 'en')}</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
