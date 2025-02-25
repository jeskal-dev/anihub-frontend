<script>
	import { Menu, X } from 'lucide-svelte';
	import HeaderLogo from './HeaderLogo.svelte';
	import HeaderNav from './HeaderNav.svelte';
	import HeaderMobileMenu from './HeaderMobileMenu.svelte';
	import HeaderAuth from './HeaderAuth.svelte';

	let isMobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<header class="header-animate fixed z-50 w-full transition-all duration-300">
	<nav
		class="container mx-auto flex items-center justify-between p-3 md:grid md:grid-cols-[auto_1fr_auto]"
	>
		<HeaderLogo />
		<HeaderNav />
		<div class="hidden flex-row items-center gap-5 md:flex">
			<HeaderAuth />
		</div>
		<button class="text-neutral-300 md:hidden" onclick={toggleMobileMenu}>
			{#if isMobileMenuOpen}
				<X size={24} />
			{:else}
				<Menu size={24} />
			{/if}
		</button>
	</nav>
	<HeaderMobileMenu show={isMobileMenuOpen} />
</header>

<style lang="postcss">
	@reference "tailwindcss/theme";

	.header-animate {
		animation: overlay-header linear both;
		animation-timeline: scroll();
		animation-range: 0 150px;
		background-color: theme(--color-neutral-900);
	}

	@keyframes overlay-header {
		100% {
			box-shadow:
				0 5px 20px -5px #ffffff1a,
				0 0 0 1px #ffffff1a;
			backdrop-filter: blur(theme(--blur-lg));
			background-color: theme(--color-neutral-900/80);
		}
	}
</style>
