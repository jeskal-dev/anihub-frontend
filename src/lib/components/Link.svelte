<script lang="ts">
	import type { NavLink } from '$lib/constants/navigation-links';
	import type { Component } from 'svelte';

	let { name, href, icon }: Partial<NavLink> = $props();
</script>

<a
	{href}
	class="flex items-center space-x-2 text-neutral-300 transition-colors hover:text-indigo-600"
>
	{#if icon}
		{@const Icon = icon as Component}
		<Icon class="h-5 w-5" />
	{/if}
	<span>{name}</span>
</a>
