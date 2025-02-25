<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import Select from '$lib/components/Select.svelte';
	import { renderNavLinks, type NavLink } from '$lib/constants/navigation-links';
	import cn from '$lib/helpers/classnames';
	import authStore from '$lib/stores/authStore';
	import { ChevronDown } from 'lucide-svelte';
</script>

{#snippet dropdown({ name, subLinks = [] }: Partial<NavLink>)}
	<Select offsetValue={10} placement="bottom">
		{#snippet trigger({ toggle, isOpen })}
			<button
				class={cn(
					'flex cursor-pointer items-center gap-1 text-neutral-300 transition-colors hover:text-indigo-600',
					isOpen && 'text-indigo-600'
				)}
				onclick={toggle}
			>
				<span>{name}</span>
				<ChevronDown class={cn('transition-transform', isOpen && 'rotate-180')} />
			</button>
		{/snippet}

		<div
			class="flex min-w-[200px] flex-col space-y-2 rounded-lg border border-neutral-700/80 bg-neutral-900 p-4 shadow-lg"
		>
			{#each subLinks as navLink}
				<Link {...navLink} />
			{/each}
		</div>
	</Select>
{/snippet}

<div class="hidden flex-grow items-center justify-center gap-6 md:flex">
	{#each renderNavLinks($authStore.isAuthenticated) as link}
		{#if link.subLinks}
			{@render dropdown(link)}
		{:else}
			<Link {...link} />
		{/if}
	{/each}
</div>
