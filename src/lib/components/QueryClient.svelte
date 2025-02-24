<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	const query = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 30,
				retry: 3,
				retryDelay: 2000,
				refetchOnMount: false,
				networkMode: 'offlineFirst'
			}
		}
	});
	const { children } = $props();
</script>

<QueryClientProvider client={query}>
	{@render children()}
</QueryClientProvider>
