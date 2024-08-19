<script lang="ts">
	import { page } from '$app/stores';
	$: textContent = $page.data.langTexts.parts.adminSidebarLinks;
</script>

<svelte:head>
	<style>
		.main {
			background-color: #131311;
		}
	</style>
</svelte:head>

<div class="member-wrapper" id="member-wrapper-loader">
	<div class="member-wrapper__sidebar">
		<div class="member-sidebar-nav">
			<ul class="member-sidebar-nav__list">
				<li>
					<a
						href="/admin/requisites"
						class="member-sidebar-nav__item"
						class:is-current={$page.url.pathname.includes('/requisites')}
					>
						<i class="icon icon-card" />
						<span class="member-sidebar-nav__title">{textContent[0]}</span>
					</a>
				</li>
				<li>
					<a
						href="/admin/users"
						class="member-sidebar-nav__item"
						class:is-current={$page.url.pathname.includes('/users')}
					>
						<i class="icon icon-user" />
						<span class="member-sidebar-nav__title">{textContent[1]}</span>
					</a>
				</li>
				<li>
					<a
						href="/admin/transactions"
						class="member-sidebar-nav__item"
						class:is-current={$page.url.pathname.includes('/transactions')}
					>
						<i class="icon icon-doublearrow" />
						<span class="member-sidebar-nav__title">{textContent[2]}</span>
					</a>
				</li>
				<li>
					<form action="/?/signOut" method="post" class="member-sidebar-nav__item">
						<button type="submit" class="nav-btn-link">
							<i class="icon icon-off" />
							<span class="member-sidebar-nav__title">{textContent[3]}</span>
						</button>
					</form>
				</li>
			</ul>
		</div>
	</div>
	<div class="member-wrapper__main">
		<slot />
	</div>
</div>

<style>
	.icon {
		color: #b26fe7;
		transition: color 0.3s;
	}

	.member-sidebar-nav {
		background-color: #2e2c2b;
		border: 2px solid white; /* Добавлен белый бортик */
		border-radius: 8px; /* Добавлен радиус для скругления углов */
		padding: 10px; /* Добавлен отступ */
	}

	li {
		color: white;
		transition: background-color 0.3s, color 0.3s;
	}

	li:hover .icon {
		color: white;
	}

	a:hover {
		background-color: #b26fe7;
	}
	a.is-current {
		background-color: #b26fe7;
		color: white;
	}

	li a.is-current .icon {
		color: white !important;
	}

	form:hover {
		background-color: #b26fe7;
	}

	.member-sidebar-nav__item {
		
	}
</style>
