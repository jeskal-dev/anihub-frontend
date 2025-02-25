import { Auth } from '$lib/api/services/auth.js';
import authStore from '$lib/stores/authStore.js';
import { tokenStore } from '$lib/stores/tokenStore.js';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const actions = {
	default: async function () {
		const token = get(tokenStore);
		if (token.accessToken) {
			Auth.logout(token.accessToken);
			authStore.logout();
			tokenStore.clearTokens();
		}

		throw redirect(302, '/');
	}
};
