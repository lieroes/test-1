<script lang="ts">
	// @ts-ignore
	import Swiper from 'swiper/esm/svelte/swiper.svelte';
	// @ts-ignore
	import SwiperSlide from 'swiper/esm/svelte/swiper-slide.svelte';

	import 'swiper/swiper.min.css';
	import 'swiper/components/pagination/pagination.min.css';

	export let currencies: any[];
	export let currencyCode: string;
</script>

<div class="exchange-footer">
	<div class="exchange-rates">
		<Swiper
			class="exchange-rate-carousel"
			spaceBetween={1}
			slidesPerView={2}
			slidesPerGroup={2}
			autoplay={{
				delay: 3000,
				disableOnInteraction: true
			}}
			breakpoints={{
				420: {
					slidesPerView: 3,
					slidesPerGroup: 3
				},
				580: {
					slidesPerView: 4,
					slidesPerGroup: 4
				},
				825: {
					slidesPerView: 5,
					slidesPerGroup: 5
				},
				1100: {
					slidesPerView: 6,
					slidesPerGroup: 6
				}
			}}
		>
			{#each currencies as currency}
				<SwiperSlide>
					<div class="exchange-currencies-item">
						<div class="exchange-currencies-item__icon">
							<img src="/images/arrow-block.svg" alt="Arrow Icon" />
						</div>
						<div class="exchange-currencies-item__dscr">
							<div class="exchange-currencies-item__label">{currency.ticker}</div>
						</div>
						<div class="exchange-currencies-item__separator"></div>
						<div class="exchange-currencies-item__value">
							{currencyCode}
							{currency.price.toFixed(2)}
						</div>
					</div>
				</SwiperSlide>
			{/each}
		</Swiper>
	</div>
</div>

<style>

	.exchange-footer {
		background-color: #0F1011;
		padding: 20px;
		overflow: hidden;
		display: flex;
		justify-content: center;
	}

	.exchange-rates {
		padding: 10px;
		max-width: 1200px;
		width: 100%;
	}

	.exchange-currencies-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #1D1F20;
		border-radius: 10px;
		padding: 10px;
		color: #fff;
		text-align: center;
		border: 1px solid #fff;
		position: relative;
		margin: 5px;
		min-width: 120px;
		max-width: 120px;
	}

	.exchange-currencies-item__icon img {
		position: static;
		margin-left: 100px;
		margin-top: 5px;
		width: 12px;
		height: 12px;
	}

	.exchange-currencies-item__dscr {
		margin-bottom: 10px;
	}

	.exchange-currencies-item__label {
		font-size: 10px;
		color: #B26FE7;
		font-weight: bold;
	}

	.exchange-currencies-item__value {
		font-size: 12px;
		color: #fff;
		font-weight: bold;
	}

	.exchange-currencies-item__separator {
		width: 100%;
		height: 1px;
		background-color: #aaa;
		margin: 5px 0;
	}

</style>
