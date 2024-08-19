<script lang="ts">
	import { page } from '$app/stores';
	import Pagination from '$lib/components/Pagination.svelte';
	import type { PageData } from './$types';

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

	const shortenId = (id: string) => id.substring(0, 8);

	$: textContent = $page.data.langTexts.pages.notifications;
	$: notificationStatusTexts = $page.data.langTexts.parts.notificationStatusTexts;
</script>

<svelte:head>
	<title>{textContent.meta.title}</title>
</svelte:head>

<div id="notifications" class="member-table-card new-design">
	<div class="member-table-card__body">
		{#if data.notifications.length === 0}
			<div class="no-notifications">
				{textContent.notificationsNotFound}
			</div>
		{/if}
		{#each data.notifications as item}
			<a href="/order/{item.order.id}" class="notification-row">
				<div class="notification-date">
					{formatDate(item.createdAt, data.langCode)}
				</div>
				<div class="notification-status">
					{#if item.status === 0 || item.status === 1}
						<i class="icon icon-clock" />
					{:else if item.status === 2 || item.status === 3 || item.status === 4}
						<i class="icon icon-buy" />
					{:else if item.status === 5}
						<i class="icon icon-check-double" />
					{:else if item.status === 6}
						<i class="icon icon-close" />
					{/if}
					<span>{notificationStatusTexts[item.status]}</span>
				</div>
				<div class="notification-id">
					{shortenId(item.order.id)}
				</div>
			</a>
		{/each}
	</div>
</div>

<Pagination itemsCount={data.notificationsCount} itemsPerPage={15} paramName={'page'} />

<style>
	#notifications.new-design {
		background-color: transparent;
		border-radius: 8px;
		padding: 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	.member-table-card__body {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.no-notifications {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 32px;
		font-size: 18px;
		color: #666;
	}
	.notification-row {
		display: flex;
		justify-content: space-between;
		padding: 12px;
		background-color: #fff;
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		transition: background-color 0.3s;
		text-decoration: none;
		color: inherit;
	}
	.notification-row:hover {
		background-color: #f0f0f0;
	}
	.notification-date, .notification-status, .notification-id {
		display: flex;
		align-items: center;
	}
	.notification-date {
		width: 25%;
	}
	.notification-status {
		width: 60%;
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 16px;
	}
	.notification-id {
		width: 15%;
		text-align: right;
		font-family: monospace;
	}
	.icon {
		width: 16px;
		height: 16px;
	}

	a {
		background-color: #B26FE7 !important;
		color: white !important;
		border: none !important;
		height: 70px;
		width: 110%;
	}
</style>
