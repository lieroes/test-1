<script lang="ts">
	import { page } from '$app/stores';
	import Pagination from '$lib/components/Pagination.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const shortenId = (id: string) => id.substring(0, 8);

	$: textContent = $page.data.langTexts.pages.adminUsers;
	$: tableHeader = $page.data.langTexts.parts.tableHeader;
</script>

<svelte:head>
	<title>{textContent.meta.title}</title>
</svelte:head>

<SearchBar placeholder={textContent.searchBarPlaceholder} searchParamName="q" />

<div class="member-table-card">
	<div class="member-table-card__body">
		<div class="tabs">
			<div role="tabpanel" class="tabpanel">
				<div>
					<div class="table-card-head">
						<div class="table-card-cell" style="width: 12%;">{tableHeader.id}</div>
						<div class="table-card-cell" style="width: 22%;">{tableHeader.name}</div>
						<div class="table-card-cell" style="width: 32%;">{tableHeader.email}</div>
						<div class="table-card-cell" style="width: 22%;">{tableHeader.phone}</div>
						<div class="table-card-cell" style="width: 12%;">{tableHeader.role}</div>
					</div>
					<div class="table-wrapper">
						{#if data.users.length === 0}
							<div class="no-users">{textContent.usersNotFound}</div>
						{/if}

						{#each data.users as user}
							<a href="/admin/users/{user.id}" class="table-card-row">
								<div class="table-card-cell" style="width: 12%;">
									<span>{shortenId(user.id)}</span>
								</div>
								<div class="table-card-cell" style="width: 22%;">
									{user.UserInfo?.firstName || ''} {user.UserInfo?.lastName || ''}
								</div>
								<div class="table-card-cell" style="width: 32%;">
									{user.email}
								</div>
								<div class="table-card-cell" style="width: 22%;">
									{user.phone}
								</div>
								<div class="table-card-cell" style="width: 12%;">
									{user.role}
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<Pagination itemsCount={data.usersCount} itemsPerPage={10} paramName={'page'} />

<style>
	.member-table-card {
		background-color: #1a1a1a;
		color: #fff;
		border-radius: 8px;
		padding: 16px;
	}

	.member-table-card__body {
		padding: 0;
	}

	.tabs {
		width: 100%;
	}

	.table-card-head {
		display: flex;
		background-color: #333;
		padding: 12px;
		border-radius: 8px 8px 0 0;
	}

	.table-card-cell {
		color: #b26fe7;
		font-weight: bold;
		padding: 8px;
	}

	.table-wrapper {
		background-color: #1a1a1a;
		border-radius: 0 0 8px 8px;
	}

	.table-card-row {
		display: flex;
		padding: 12px;
		border-bottom: 1px solid #444;
		transition: background-color 0.2s ease;
		text-decoration: none;
		color: #fff;
	}

	.table-card-row:hover {
		background-color: #333;
	}

	.no-users {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 12px;
		color: #888;
	}

	.table-card-cell {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.table-card-row .table-card-cell {
		width: 100%;
		padding: 8px;
	}

	@media screen and (max-width: 1000px) {
		.table-card-cell {
			width: auto;
		}
	}
</style>
