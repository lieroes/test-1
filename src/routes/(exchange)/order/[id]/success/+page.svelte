<script lang="ts">
	import { page } from '$app/stores';
	$: textContent = $page.data.langTexts.pages.order.success;
</script>

<div data-v-0b0797a5="">
	<div style="display: flex; justify-content: center; align-items: center; margin-bottom: 16px;">
		<div
			style="background-color: #a4a7e3; padding: 10px; border-radius: 100%; width: 72px; height: 72px; display: flex; justify-content: center; align-items: center;"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 50 50"
				width="50px"
				height="50px"
				fill="#fff"
			>
				<path
					d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z"
				/>
			</svg>
		</div>
	</div>

	<h1 data-v-0e3ce062="" data-v-0b0797a5="" class="sales-funnel-title">{textContent.title}</h1>

	<br />
	<p style="font-size: 16px; text-align: center; margin-bottom: 16px;">
		{@html textContent.subtitle}
	</p>

	<div data-v-05c4f620="" data-v-0b0797a5="" class="sales-funnel-actions" style="margin: 16px 0;">
		<div data-v-05c4f620="" class="sales-funnel-actions__submit">
			<a href="/" data-v-0b0797a5="" data-v-05c4f620="" class="btn btn-lg btn-primary">
				{textContent.button}
			</a>
		</div>
	</div>
</div>
