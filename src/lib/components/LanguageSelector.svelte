<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { languages } from '$lib/languages';

	let currentLanguage = languages.find((lang) => lang.code === $page.data.langCode) || languages[0];
	const setLanguage = (newLanguage: any) => (currentLanguage = newLanguage);

	$: langCode = $page.data.langCode;
</script>

<div class="nav-links__item nav-dropdown">
	<button class="nav-dropdown__toggle nav-link" style="width: 100%;">
		<i class="icon icon-earth" />
		<span>{currentLanguage.title}</span>
	</button>
	<div class="nav-dropdown-menu__wrapper nav-dropdown-menu--sm nav-dropdown-menu--lang">
		<div class="nav-dropdown-menu__inner">
			<form action="/?/setLang" method="post" use:enhance>
				<input type="hidden" name="language" value={currentLanguage.code} />
				<ul class="nav-dropdown-list nav-dropdown-list--primary">
					{#each languages.filter((lang) => lang.code !== langCode) as language}
						<li>
							<button
								class="nav-dropdown-list__item languageLink"
								on:click={() => setLanguage(language)}
								type="submit"
							>
								<div class="nav-dropdown-list__item-main">
									<div class="nav-dropdown-list__item-title">{language.title}</div>
								</div>
							</button>
						</li>
					{/each}
				</ul>
			</form>
		</div>
	</div>
</div>
