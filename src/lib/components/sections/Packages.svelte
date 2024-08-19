<script lang="ts">
	import { page } from '$app/stores';
	// @ts-ignore
	import Swiper from 'swiper/esm/svelte/swiper.svelte';
	// @ts-ignore
	import SwiperSlide from 'swiper/esm/svelte/swiper-slide.svelte';
	import 'swiper/swiper.min.css';
	import 'swiper/components/pagination/pagination.min.css';

	export let currencies: any[];
	export let currencyCode: string;

	const calculateReceiveAmount = (coinId: string, coinAmount: number) => {
		return (coinAmount / currencies.find((coin: any) => coin.ticker === coinId).price).toFixed(3);
	};

	$: textContent = $page.data.langTexts.sections.packages;
</script>

<div class="packages">
	<div class="container">
		<div class="packages-wrapper">
			<div class="packages-header">
				<h2 class="packages-header__title">
					{textContent.title} <span class="highlight">{textContent.second}</span>
				</h2>
				<p class="packages-header__subtitle">{textContent.subtitle}</p>
			</div>
			<div class="packages-main">
				<Swiper
					slidesPerView={4}
					slidesPerGroup={4}
					autoplay={{
						delay: 5000
					}}
					breakpoints={{
						100: {
							slidesPerView: 1,
							slidesPerGroup: 1
						},
						690: {
							slidesPerView: 2,
							slidesPerGroup: 2
						},
						890: {
							slidesPerView: 3,
							slidesPerGroup: 3
						},
						1070: {
							slidesPerView: 4,
							slidesPerGroup: 4
						}
					}}
					pagination={{
						el: '.swiper-pagination',
						clickable: true
					}}
				>
					{#each textContent.items as item}
						<SwiperSlide>
							<div class="packages-item">
								<div class="packages-item__inner">
									<div class="packages-item__body">
										<div class="packages-item__body-item">
											<div class="packages-item__body-label">Pay</div>
											<div class="packages-item__body-value">
												{item.payAmount}
												{currencyCode}
											</div>
										</div>
										<div class="packages-item__arrow">
											<i class="packages-item__doublearrow icon icon-doublearrow-v" />
										</div>
										<div class="packages-item__body-item">
											<div class="packages-item__body-label">Get</div>
											<div class="packages-item__body-value">
												{calculateReceiveAmount(item.to, item.payAmount)}
												{item.to}
											</div>
										</div>
									</div>
									<div class="packages-item__footer">
										<a
											class="btn btn-xlg btn-primary"
											href="/buy?from={currencyCode}&to={item.to}&amount={item.payAmount}"
											data-sveltekit-reload
										>
											Buy
										</a>
									</div>
								</div>
							</div>
						</SwiperSlide>
					{/each}
				</Swiper>
				<div class="swiper-pagination" />
			</div>
		</div>
	</div>
</div>

<style>
	.packages {
		background-color: #000;
		padding: 40px 20px;
		color: #fff;
		display: flex;
		justify-content: center;
	}

	.container {
		max-width: 1200px;
		width: 100%;
		box-sizing: border-box;
	}

	.packages-header__title {
		font-size: 36px;
		text-align: left;
		margin-bottom: 10px;
	}

	.packages-header__subtitle {
		color: #888;
		text-align: left;
	}

	.highlight {
		color: #b26fe7;
	}

	.packages-item {
		background-color: #1d1f20;
		border: 1px solid #888;
		border-radius: 10px;
		padding: 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 180px;
		overflow: hidden;
	}

	.packages-item__body {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.packages-item__body-item {
		flex: 1;
	}

	.packages-item__body-label {
		color: #b26fe7;
		font-size: 14px;
	}

	.packages-item__body-value {
		font-size: 18px;
		margin: 5px 0;
	}

	.packages-item__arrow {
		background-color: #3a3939;
		border-radius: 50%;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #b26fe7;
		transform: rotate(90deg);
		margin-left: 20px;
		margin-right: 20px;
	}

	.packages-item__arrow img {
		transform: rotate(90deg);
		border: 2px solid #b26fe7;
		border-radius: 50%;
	}

	.btn-primary {
		background-color: #b26fe7;
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 10px;
		height: 565px;
		padding: 0;
	}

	.btn-primary:hover {
		background-color: #9e58d8;
	}

	.swiper-container {
		padding: 20px 0;
		overflow: hidden;
	}

	.swiper-slide {
		padding: 10px;
		width: 100px;
	}

	.swiper-pagination-bullet {
		background-color: #888;
		margin: 0 5px !important;
	}

	.swiper-pagination-bullet-active {
		background-color: #b26fe7;
	}

	@media (max-width: 768px) {
		.packages-header__title {
			font-size: 24px;
			text-align: left;
			margin-bottom: 10px;
			text-align: center;
		}

		.packages-header__subtitle {
			font-size: 14px;
			text-align: center;
		}

		.packages-item {
			padding: 0px;
			padding-top: 15px;
		}
	}
</style>
