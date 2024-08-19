<script lang="ts">
	import { page } from '$app/stores';
	import LanguageSelector from './LanguageSelector.svelte';
	import ClickOutside from 'svelte-click-outside';
	import { onMount } from 'svelte';

	export let user: any;
	let triggerElement;
	let userInfo = { firstName: '', lastName: '' };

	let isMobileNavOpen: boolean = false;

	const toggleMobileNav = () => {
		isMobileNavOpen = !isMobileNavOpen;
	};

	const closeMobileNav = () => {
		isMobileNavOpen = false;
	};

	$: navbarText = $page.data.langTexts.navbar;

	onMount(async () => {
		const response = await fetch('/api/user-info');
		if (response.ok) {
			userInfo = await response.json();
		} else {
			console.error('Failed to fetch user info');
		}
	});
</script>

<div class="container">
	<nav class="new-nav">
		<div class="new-nav-inner">
			<div class="nav-logo">
				<a href="/buy">
					<img src="/images/eagle.png" alt="Logo" class="nav-logo__image" />
				</a>
			</div>
			<div class="new-nav-links">
				<a
					class="new-nav-link {$page.url.pathname.includes('/buy') ? 'selected' : ''}"
					href="/buy"
					title={navbarText.links['buy']}
				>
					{navbarText.links['buy']}
				</a>
				<a
					class="new-nav-link {$page.url.pathname.includes('/sell') ? 'selected' : ''}"
					href="/sell"
					title={navbarText.links['sell']}
				>
					{navbarText.links['sell']}
				</a>
				<a
					class="new-nav-link {$page.url.pathname.includes('/about') ? 'selected' : ''}"
					href="/about-us"
					title={navbarText.links['about']}
				>
					{navbarText.links['about']}
				</a>
				<a
					class="new-nav-link {(['/terms-of-use', '/privacy-policy', '/aml-kyc-policy', '/public-offer', '/cookies-policy', '/dispute-resolution', '/risk-disclosure'].some(path => $page.url.pathname.includes(path)) ? 'selected' : '')}"
					href="/policies/terms-of-use"
					title={navbarText.links['policies']}
				>
					{navbarText.links['policies']}
				</a>
			</div>
			<div class="new-nav-secondary">
				<LanguageSelector />
				{#if user && user?.registrationStage === 2}
					<div class="new-nav-member">
						<span class="new-nav-span">{userInfo.firstName} {userInfo.lastName}</span>
						<button class="new-nav-user-toggle">
							<img src="/images/user-icon.svg" alt="User Icon" class="nav-user-icon__image" />
						</button>
						<div class="new-nav-user-dropdown">
							<ul>
								{#if user?.role === 'ADMIN'}
									<li>
										<a href="/admin/transactions">
											<i class="icon icon-shield-alt" />
											{navbarText.links.adminDashboard}
										</a>
									</li>
								{/if}
								<li>
									<a href="/member/settings">
										<i class="icon icon-user" />
										{navbarText.links.profileSettings}
									</a>
								</li>
								<li>
									<a href="/member/notifications/">
										<i class="icon icon-notifications" />
										{navbarText.links.notifications}
									</a>
								</li>
								<li>
									<a href="/member/transactions/">
										<i class="icon icon-doublearrow" />
										{navbarText.links.transactions}
									</a>
								</li>
								<li>
									<form action="/?/signOut" method="post">
										<button type="submit" class="nav-btn-link">
											<i class="icon icon-off" />
											{navbarText.links.logOut}
										</button>
									</form>
								</li>
							</ul>
						</div>
					</div>
				{:else}
					<div class="new-nav-auth">
						<a class="btn btn-login" href="/sign-in">{navbarText.auth['sign-in']}</a>
						<a class="btn btn-signup" href="/sign-up">{navbarText.auth['sign-up']}</a>
					</div>
				{/if}
			</div>
			<div class="new-nav-mobile">
				<LanguageSelector />
				<button class="nav-burger" on:click={toggleMobileNav} bind:this={triggerElement}>
					<span class="nav-burger-toggle toggle-open">Menu</span>
				</button>
			</div>
		</div>
		<ClickOutside on:clickoutside={closeMobileNav} exclude={[triggerElement]}>
			<div class="new-nav-mobile-dropdown {isMobileNavOpen ? 'is-open' : ''}">
				<ul>
					<a
						class="new-nav-link {$page.url.pathname.includes('/buy') ? 'selected' : ''}"
						href="/buy"
						title={navbarText.links['buy']}
					>
						{navbarText.links['buy']}
					</a>
					<a
						class="new-nav-link {$page.url.pathname.includes('/sell') ? 'selected' : ''}"
						href="/sell"
						title={navbarText.links['sell']}
					>
						{navbarText.links['sell']}
					</a>
					<a
						class="new-nav-link {$page.url.pathname.includes('/about') ? 'selected' : ''}"
						href="/about-us"
						title={navbarText.links['about']}
					>
						{navbarText.links['about']}
					</a>
					<a
						class="new-nav-link {$page.url.pathname.includes('/policies') ? 'selected' : ''}"
						href="/policies/terms-of-service"
						title={navbarText.links['policies']}
					>
						{navbarText.links['policies']}
					</a>
					{#if user && user?.registrationStage === 2}
						<div class="nav-links__secondary">
							<div class="nav-links__list">
								<LanguageSelector />
							</div>
						</div>
						<div class="nav-member__user">
							<div class="nav-member__user-item">
								<div class="nav-member-user">
									<button class="nav-member-user__toggle">
										<i class="nav-member-user__user-icon icon icon-user" />
									</button>
									<div class="nav-member-user__dropdown">
										<div class="nav-member-user__dropdown-wrapper">
											<ul class="nav-member-user__links">
												{#if user?.role === 'ADMIN'}
													<li>
														<a
															href="/admin/transactions"
															class="nav-member-user__links-item is-current"
														>
															<i class="icon icon-shield-alt" />
															<span class="member-sidebar-nav__title">{navbarText.links.adminDashboard}</span>
														</a>
													</li>
												{/if}
												<li>
													<a href="/member/settings" class="nav-member-user__links-item is-current">
														<i class="icon icon-user" />
														<span class="member-sidebar-nav__title">{navbarText.links.profileSettings}</span>
													</a>
												</li>
												<li>
													<a href="/member/notifications/" class="nav-member-user__links-item">
														<i class="icon icon-notifications" />
														<span class="member-sidebar-nav__title">{navbarText.links.notifications}</span>
													</a>
												</li>
												<li>
													<a href="/member/transactions/" class="nav-member-user__links-item">
														<i class="icon icon-doublearrow" />
														<span class="member-sidebar-nav__title">{navbarText.links.transactions}</span>
													</a>
												</li>
												<li>
													<form action="/?/signOut" method="post" class="nav-member-user__links-item">
														<button type="submit" class="nav-btn-link">
															<i class="icon icon-off" />
															<span class="member-sidebar-nav__title">{navbarText.links.logOut}</span>
														</button>
													</form>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					{:else}
						<div class="nav-links__secondary">
							<div class="nav-links__list">
								<LanguageSelector />
							</div>
							<div class="nav-links__login-group">
								<a class="btn btn-sm btn-secondary" href="/sign-in">
									{navbarText.auth['sign-in']}
								</a>
								<a class="btn btn-sm btn-primary" href="/sign-up">
									{navbarText.auth['sign-up']}
								</a>
							</div>
						</div>
					{/if}
				</ul>
			</div>
		</ClickOutside>
	</nav>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

	.container {
		max-width: 100%;
		margin: 0 auto;
		padding: 0 20px;
	}

	.new-nav-span {
		margin-left: 40px;
		margin-right: -29px;
		min-width: 100px;
	}

	.new-nav {
		background-color: #000;
		padding: 10px 20px;
		font-family: 'Inter', sans-serif;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: white;
		height: 100px;
		z-index: 10;
	}

	.new-nav-inner {
		display: flex;
		justify-content: right;
		align-items: right;
		width: 100%;
	}

	.nav-logo {
		margin-right: 50px;
		margin-left: 0px;
	}

	.nav-logo__image {
		margin-top: -13px;
		width: 60px;
		height: 60px;
		border-radius: 10%;
		margin-left: 0;
	}

	.new-nav-links {
		display: flex;
		gap: 40px;
		margin: 0 auto;
		margin-right: 20px; 
	}

	.new-nav-link {
		color: white;
		text-decoration: none;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: auto;
		white-space: nowrap;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.new-nav-link.selected {
		border-bottom: 2px solid #fff;
	}

	.new-nav-secondary {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-left: 270px;
	}

	.new-nav-member {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.new-nav-user-toggle {
		background: none;
		border: none;
		color: black;
		font-size: 18px;
		cursor: pointer;
	}

	.new-nav-user-dropdown {
		position: absolute;
		top: 30px;
		right: 0;
		background: #fff;
		color: #000;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: none;
		width: 300px;
		border: 1px solid grey;
		z-index: 30;
	}

	.new-nav-user-toggle:focus + .new-nav-user-dropdown,
	.new-nav-user-dropdown:hover {
		display: block;
	}

	.new-nav-user-dropdown ul {
		list-style: none;
		padding: 10px;
		margin: 0;
	}

	.new-nav-user-dropdown ul li {
		margin-bottom: 10px;
	}

	.new-nav-user-dropdown li {
		display: flex;
		align-items: center;
		height: 50px;
		font-weight: 800;
	}

	.new-nav-user-dropdown ul li a,
	.new-nav-user-dropdown ul li button {
		color: #000;
		text-decoration: none;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 14px;
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.new-nav-auth {
		min-width: 250px;
	}

	.new-nav-auth .btn {
		padding: 8px 16px;
		border-radius: 5px;
		font-size: 14px;
		text-decoration: none;
		margin-left: 10px;
	}

	.btn-login {
		background-color: #6200ea;
		color: white;
		border: none;
	}

	.btn-signup {
		background-color: transparent;
		color: white;
		border: 1px solid #fff;
	}

	.new-nav-mobile {
		display: none;
	}

	@media (min-width: 768px) {
		.new-nav-mobile-dropdown {
			display: none;
		}
	}

	@media (max-width: 950px) {
		.new-nav-link {
			color: #000;
		}
		.new-nav-mobile-dropdown {
			color: black !important;
		}
		.new-nav-inner {
			display: flex;
			justify-content: right;
			align-items: right;
			width: 100%;
		}
		.nav-logo {
			margin-right: 80px;
			margin-left: 0px;
		}
		.new-nav-secondary {
			display: none;
		}

		.new-nav-links {
			display: none;
		}

		.new-nav-mobile {
			display: flex;
			align-items: right;
			gap: 10px;
		}

		.new-nav-mobile-dropdown {
			position: absolute;
			top: 60px;
			right: 20px;
			background: #fff;
			color: #000 !important;
			width: 40%;
			border-radius: 5px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			display: none;
			z-index: 100;
		}

		.new-nav-mobile-dropdown.is-open {
			display: block;
		}

		.new-nav-mobile-dropdown ul {
			list-style: none;
			padding: 10px;
			margin: 0;
		}

		.new-nav-mobile-dropdown ul li {
			margin-bottom: 10px;
		}

		.new-nav-mobile-dropdown ul li a,
		.new-nav-mobile-dropdown ul li button {
			color: #000;
			text-decoration: none;
			background: none;
			border: none;
			cursor: pointer;
			font-size: 14px;
			display: flex;
			align-items: center;
		}

		.nav-burger {
			background: none;
			border: none;
			color: #fff;
			font-size: 18px;
			cursor: pointer;
		}

		.nav-auth {
			display: flex;
			gap: 10px;
		}
	}

	.icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		background-size: contain;
		background-repeat: no-repeat;
	}
</style>
