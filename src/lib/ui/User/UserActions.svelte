<script lang="ts">
	import cn from '$lib/helpers/classnames';
	import { Cog, LogOut, UserCircle } from 'lucide-svelte';

	interface LinkProps {
		href: string;
		class?: string;
		label?: string;
		icon: any;
	}
</script>

{#snippet link({ href, class: className, label, icon: Icon }: LinkProps)}
	<a
		{href}
		class={cn(
			'flex items-center space-x-2 text-white transition-colors hover:text-indigo-600',
			className
		)}
	>
		<Icon class="h-5 w-5"></Icon>
		<span>{label}</span>
	</a>
{/snippet}

<div class="flex flex-col space-y-4">
	{@render link({ href: '/perfil', icon: UserCircle, label: 'Perfil' })}
	{@render link({ href: '/config', icon: Cog, label: 'Configuración' })}
	{@render link({
		href: '/logout',
		icon: LogOut,
		label: 'Cerrar sesión',
		class: 'hover:text-red-500'
	})}
</div>
