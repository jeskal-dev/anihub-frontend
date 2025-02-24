import type { TokenDto } from '$lib/api/dto/TokenDto';
import Cookies from 'js-cookie';
import { writable } from 'svelte/store';

interface TokenState {
	accessToken: string | null;
	refreshToken: string | null;
}

const initialState: TokenState = {
	accessToken: Cookies.get('accessToken') ?? null,
	refreshToken: Cookies.get('refreshToken') ?? null
};

function createTokenStore() {
	const { subscribe, update } = writable<TokenState>(initialState);

	return {
		subscribe,

		// Método para establecer tokens
		setTokens(data: TokenDto) {
			const { accessToken, refreshToken, expiresIn } = data;

			Cookies.set('accessToken', accessToken, {
				expires: expiresIn,
				secure: true,
				sameSite: 'strict'
			});
			Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });

			update((state) => ({
				...state,
				accessToken,
				refreshToken
			}));
		},

		clearTokens() {
			Cookies.remove('accessToken');
			Cookies.remove('refreshToken');
			update((state) => ({
				...state,
				accessToken: null,
				refreshToken: null
			}));
		}
	};
}

export const tokenStore = createTokenStore();
