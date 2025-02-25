<script>
	import authStore from '$lib/stores/authStore';
	import { derived } from 'svelte/store';
	import UserAccount from '../User/UserAccount.svelte';
	import HeaderLink from './HeaderLink.svelte';

	const isAuth = derived(authStore, ($auth) => $auth.isAuthenticated);
</script>

{#if $isAuth}
	<UserAccount />
{:else}
	<HeaderLink label="Registrarse" href="/register" class="bg-indigo-600" />
	<HeaderLink label="Iniciar sesión" href="/login" class="bg-neutral-800" />
{/if}
