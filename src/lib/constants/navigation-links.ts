import { Bell, BookOpen, Home, Search, Users } from 'lucide-svelte';

export interface NavLink {
	name: string;
	href?: string;
	icon?: unknown;
	subLinks?: NavLink[];
}

const baseLinks: NavLink[] = [
	{ name: 'Inicio', href: '/', icon: Home },
	{
		name: 'Explorar',
		subLinks: [
			{ name: 'Anime', href: '/explore?type=anime', icon: Search },
			{ name: 'Manga', href: '/explore?type=manga', icon: BookOpen },
			{ name: 'Personajes', href: '/explore/characters', icon: Users }
		]
	}
];

const authLinks: NavLink[] = [
	{ name: 'Mi Lista', href: '/user/list', icon: BookOpen },
	{
		name: 'Comunidad',
		subLinks: [
			{ name: 'Reseñas', href: '/community/reviews' },
			{ name: 'Foro', href: '/forum' }
		]
	},
	{ name: 'Notificaciones', href: '/notifications', icon: Bell }
];

export const renderNavLinks = (isAuthenticated?: boolean) => {
	return [...baseLinks, ...(isAuthenticated ? authLinks : [])];
};
