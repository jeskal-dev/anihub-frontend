<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Toast, ToastType } from './Toast.types';

	import cn from '$lib/helpers/classnames';
	import { AlertCircle, Check, Info, X } from 'lucide-svelte';
	import { toaster } from './ToastState.svelte';
	interface Props {
		toast: Toast;
		closable?: boolean;
		enterTransition: Record<string, unknown>;
		exitTransition: Record<string, unknown>;
		withProgress?: boolean;
	}

	let {
		toast = $bindable(),
		closable = true,
		enterTransition,
		exitTransition,
		withProgress
	}: Props = $props();

	const icons: Record<ToastType, any> = {
		success: Check,
		error: AlertCircle,
		info: Info
	};

	const color: Record<ToastType, string> = {
		success: 'text-green-500',
		error: 'text-red-500',
		info: 'text-indigo-500'
	};

	function getIcon(type?: ToastType) {
		if (!type) return Info;
		return icons[type];
	}
	function getColor(type?: ToastType) {
		if (!type) return 'text-neutral-200';
		return color[type];
	}

	let progress = $derived(toast.progress);
	let Icon = $derived(getIcon(toast.type));
</script>

<div
	onclick={() => toaster.close(toast.id)}
	aria-hidden="true"
	in:fly={{ ...enterTransition }}
	out:fly={{ ...exitTransition }}
	class="relative flex w-80 rounded-md bg-neutral-800 text-neutral-100 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] drop-shadow-md"
>
	{#if withProgress}
		<div
			class={cn('absolute top-0 left-0 h-[3px] rounded-md bg-yellow-500', toast.progressColor)}
			style:width={`${$progress}%`}
		></div>
	{/if}
	<div class="relative flex h-full w-full items-center justify-center py-4">
		<div class="flex h-full w-full items-center justify-center gap-4">
			<Icon class={cn('h-5 w-5', getColor(toast.type))} />
			<p class="text-center text-base">{@html toast.content}</p>
		</div>
		{#if closable}
			<button
				class="absolute top-1 right-1 p-1 text-gray-800 hover:text-gray-700 focus:outline-none"
				aria-label="Close"
				onclick={() => toaster.close(toast.id)}
			>
				<X class={cn('h-5 w-5', getColor(toast.type))} />
			</button>
		{/if}
	</div>
</div>
