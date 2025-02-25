<script lang="ts">
	import Footer from '$lib/ui/Footer.svelte';
	import Header from '$lib/ui/Header/Header.svelte';

	let { children } = $props();
</script>

<Header />

<main>
	{@render children()}
</main>

<Footer />
