import { Auth } from '$lib/api/services/auth.js';
import { tokenStore } from '$lib/stores/tokenStore.js';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const actions = {
	default: async function () {
		const token = get(tokenStore);
		if (token.accessToken) {
			Auth.logout(token.accessToken); 
			tokenStore.clearTokens();
		}

		throw redirect(302, '/');
	}
};
