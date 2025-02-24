<script lang="ts">
	import cn from '$lib/helpers/classnames';
	import { portal } from '$lib/helpers/portal';
	import type { Snippet } from 'svelte';
	import { flip } from 'svelte/animate';
	import { linear } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import ToastComponent from './ToastComponent.svelte';
	import { toaster, toasts } from './ToastState.svelte';

	type Position =
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right';

	interface Props {
		withProgress?: boolean;
		stacked?: boolean;
		maxToasts?: number;
		closable?: boolean;
		customToast?: boolean;
		position?: Position;
		children?: Snippet<[unknown]>;
	}

	let {
		withProgress = false,
		stacked = true,
		maxToasts = 3,
		closable = false,
		customToast = false,
		position = 'bottom-right',
		children
	}: Props = $props();

	let enterTransition: Record<string, unknown> = $state({ x: 20, duration: 500 });
	let exitTransition: Record<string, unknown> = $state({ x: -20, duration: 500 });
	function positionClass(position: string) {
		switch (position) {
			case 'top-left':
				return 'top-0 left-0 flex-col-reverse';
			case 'top-center':
				return 'top-0 left-1/2 transform -translate-x-1/2 flex-col-reverse';
			case 'top-right':
				return 'top-0 right-0 flex-col-reverse';
			case 'bottom-left':
				return 'bottom-0 left-0 flex-col';
			case 'bottom-center':
				return 'bottom-0 left-1/2 transform -translate-x-1/2 flex-col';
			case 'bottom-right':
				return 'bottom-0 right-0 flex-col';
			default:
				return 'bottom-0 right-0 flex-col'; // Default to 'bottom-right' if an invalid position is provided
		}
	}

	function calculatePositionStyle(index: number) {
		if (position === 'top-center' || position === 'top-left' || position === 'top-right') {
			return `top: calc(${index * 15}px);`;
		}
		if (position === 'bottom-center' || position === 'bottom-left' || position === 'bottom-right') {
			return `bottom: calc(${index * 15}px);`;
		}
		return '';
	}

	$effect(() => {
		switch (position) {
			case 'top-center':
				enterTransition = { y: -20, duration: 500 };
				exitTransition = { y: 20, duration: 500 };
				break;
			case 'top-right':
				enterTransition = { x: 20, duration: 500 };
				exitTransition = { x: -20, duration: 500 };
				break;
			case 'top-left':
				enterTransition = { x: -20, duration: 500 };
				exitTransition = { x: 20, duration: 500 };
				break;
			case 'bottom-center':
				enterTransition = { y: 20, duration: 500 };
				exitTransition = { y: -20, duration: 500 };
				break;
			case 'bottom-left':
				enterTransition = { x: -20, duration: 500 };
				exitTransition = { x: 20, duration: 500 };
				break;
			case 'bottom-right':
				enterTransition = { x: 20, duration: 500 };
				exitTransition = { x: -20, duration: 500 };
				break;
		}
	});
	$effect(() => {
		if ($toasts?.length > maxToasts) toaster.clearLast(maxToasts);
	});
</script>

<div
	use:portal
	class={cn(
		'fixed z-[9999] mx-2 my-3 flex max-h-max max-w-max items-end gap-2',
		positionClass(position)
	)}
>
	{#each $toasts as toast, index (toast.id)}
		<div
			animate:flip
			in:scale={{ duration: 200, easing: linear, delay: 0, opacity: 0.5, start: 0.8 }}
			out:scale={exitTransition}
			class={cn({
				[`absolute py-3 ${positionClass(position)}`]: stacked
			})}
			style={calculatePositionStyle(index)}
		>
			{#if customToast}
				{@render children?.({ data: toast })}
			{:else}
				<ToastComponent {withProgress} {toast} {closable} {enterTransition} {exitTransition} />
			{/if}
		</div>
	{/each}
</div>
