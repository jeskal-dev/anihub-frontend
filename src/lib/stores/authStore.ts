import type { User } from '$lib/api/models/User';
import { createPersistentStore } from '$lib/services/store';

interface AuthStore {
	user: User | null;
	isAuthenticated: boolean;
}

const authStore = createPersistentStore<AuthStore>('auth', {
	// user: {
	// 	username: 'animeHater666',
	// 	displayName: 'Otaku Master',
	// 	email: 'user@example.com',
	// 	bio: 'Apasionado del anime y manga ❤️\nColeccionista de figuras',
	// 	avatar: 'https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=animeHater666',
	// 	roles: [{ name: 'USER' }]
	// },
	user: null,
	isAuthenticated: false
});

const login = (auth: Omit<AuthStore, 'isAuthenticated'>) => {
	authStore.update(() => ({ ...auth, isAuthenticated: true }));
};

const logout = () => {
	authStore.update(() => ({
		user: null,
		isAuthenticated: false
	}));
};

export default {
	set: authStore.set,
	subscribe: authStore.subscribe,
	update: authStore.update,
	login,
	logout
};
