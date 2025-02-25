<script lang="ts">
	import QueryClient from '$lib/components/QueryClient.svelte';
	import Toast from '$lib/components/Toast/Toast.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="h-screen w-screen bg-neutral-900 text-white">
	<QueryClient>
		{@render children()}
		<Toast position="top-right" maxToasts={5} />
	</QueryClient>
</div>
