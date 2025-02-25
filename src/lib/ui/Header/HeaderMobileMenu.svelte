<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import { renderNavLinks, type NavLink } from '$lib/constants/navigation-links';
	import authStore from '$lib/stores/authStore';
	import { AnimatePresence, Motion } from 'svelte-motion';
	import UserActions from '../User/UserActions.svelte';
	import HeaderLink from './HeaderLink.svelte';
	import { derived } from 'svelte/store';

	let { show = false } = $props();
	const isAuth = derived(authStore, ($auth) => $auth.isAuthenticated);
</script>

{#snippet group({ name, subLinks = [] }: Partial<NavLink>)}
	<div class="mb-2 font-medium text-neutral-400">
		{name}
	</div>
	<div class="ml-3 flex flex-col gap-3">
		{#each subLinks as link}
			<Link {...link} />
		{/each}
	</div>
{/snippet}

<AnimatePresence {show}>
	<Motion
		initial={{ opacity: 0, y: -20 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: -20 }}
		let:motion
	>
		<section use:motion class="absolute w-full bg-neutral-900 shadow-lg md:hidden">
			<div class="container mx-auto w-full space-y-4 p-4">
				{#each renderNavLinks($isAuth) as navLink}
					{#if navLink.subLinks}
						{@render group(navLink)}
					{:else}
						<Link {...navLink} />
					{/if}
				{/each}
			</div>
			{#if $isAuth}
				<UserActions />
			{:else}
				<div class="flex flex-col gap-2">
					<HeaderLink
						label="Registrarse"
						href="/register"
						class="bg-indigo-600 text-white hover:bg-indigo-700"
					/>
					<HeaderLink label="Iniciar sesión" href="/login" class="bg-neutral-800 text-white " />
				</div>
			{/if}
		</section>
	</Motion>
</AnimatePresence>
