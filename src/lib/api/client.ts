import { tokenStore } from '$lib/stores/tokenStore';
import axios from 'axios';
import { get } from 'svelte/store';
import { TokenDto } from './dto/TokenDto';
import { AUTH_ENDPOINTS } from './endpoints';

export const API_URL = 'http://localhost:8000';

const http = axios.create({
	baseURL: API_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json'
	}
});

http.interceptors.request.use((config) => {
	const { accessToken } = get(tokenStore);
	if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

http.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const { refreshToken } = get(tokenStore);
				const { data } = await http.post(
					AUTH_ENDPOINTS.REFRESH,
					TokenDto.exportRefreshToken(refreshToken)
				);
				const token = new TokenDto(data);
				tokenStore.setTokens(token);
				originalRequest.headers.Authorization = `Bearer ${token.accessToken}`;
				return http(originalRequest);
			} catch (refreshError) {
				tokenStore.clearTokens();
				throw refreshError;
			}
		}

		return Promise.reject(error as Error);
	}
);

export { http };
