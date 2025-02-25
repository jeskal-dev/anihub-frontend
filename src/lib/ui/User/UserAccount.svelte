<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import authStore from '$lib/stores/authStore';
	import { derived } from 'svelte/store';
	import UserActions from './UserActions.svelte';

	const user = derived(authStore, ($auth) => $auth.user);
</script>

<Select offsetValue={10} placement="bottom">
	{#snippet trigger({ toggle })}
		<button
			class="flex cursor-pointer items-center space-x-2 rounded-md p-2 transition-colors hover:bg-neutral-800"
			onclick={toggle}
		>
			<picture class="h-8 w-8 overflow-hidden rounded-full object-cover">
				<enhanced:img
					src={$user?.avatar ?? ''}
					alt={$user?.username ?? 'Usuario'}
					class="h-full w-full"
				/>
			</picture>
			<span class="hidden font-medium text-white md:flex">
				{$user?.displayName ?? $user?.username}
			</span>
		</button>
	{/snippet}
	<section class="z-50 rounded-md border border-neutral-700/80 bg-neutral-900 p-4 shadow-lg">
		<UserActions />
	</section>
</Select>
