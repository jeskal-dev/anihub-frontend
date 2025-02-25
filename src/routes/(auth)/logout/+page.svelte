<script lang="ts">
	import { goto } from '$app/navigation';
	import authStore from '$lib/stores/authStore';
	import { onMount } from 'svelte';

	authStore.logout();
	onMount(() => {
		const timeout = setTimeout(() => goto('/'), 2000);
		return () => clearTimeout(timeout);
	});
</script>

<div class="flex min-h-screen flex-col items-center justify-center text-neutral-100">
	<div class="animate-pulse">
		<h1 class="text-3xl font-bold text-indigo-600">Cerrando sesión...</h1>
		<p class="mt-4 text-neutral-300">Redirigiendo en breve.</p>
	</div>
</div>
