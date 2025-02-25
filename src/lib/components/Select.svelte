<script lang="ts">
	import cn from '$lib/helpers/classnames';
	import { parseStyles } from '$lib/helpers/parseStyles';
	import {
		autoUpdate,
		computePosition,
		offset as floatingOffset,
		shift,
		type Placement
	} from '@floating-ui/dom';
	import { type Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	interface TriggerProps {
		toggle: () => void;
		isOpen: boolean;
	}

	interface ChildrenProps {
		close: () => void;
	}

	interface Props {
		placement?: Placement;
		offsetValue?: number;
		className?: string;
		trigger: Snippet<[TriggerProps]>;
		children?: Snippet<[ChildrenProps]>;
	}

	const { placement = 'bottom', offsetValue = 0, className, trigger, children }: Props = $props();
	let isOpen = $state(false);
	let referenceEl = $state<HTMLElement | null>(null);
	let floatingEl = $state<HTMLElement | null>(null);
	let floatingStyles = $state({
		left: '0px',
		top: '0px'
	});

	async function updatePosition() {
		if (referenceEl && floatingEl) {
			const { x, y } = await computePosition(referenceEl, floatingEl, {
				placement,
				strategy: 'absolute',
				middleware: [floatingOffset(offsetValue), shift()]
			});
			floatingStyles = {
				left: `${x}px`,
				top: `${y}px`
			};
		}
	}

	function toggle(): void {
		isOpen = !isOpen;
		if (isOpen) updatePosition();
	}

	function close(): void {
		isOpen = false;
	}

	function handleDocumentClick(event: MouseEvent): void {
		if (isOpen && referenceEl && floatingEl) {
			const target = event.target as Node;
			if (!referenceEl.contains(target) && !floatingEl.contains(target)) close();
		}
	}

	function autoUpdateAction(
		node: HTMLElement,
		params: { reference: HTMLElement | null; update: () => void }
	) {
		if (!params.reference) return { destroy() {} };
		const cleanup = autoUpdate(params.reference, node, params.update);
		return { destroy: cleanup };
	}
</script>

<svelte:document onclick={handleDocumentClick} />
<div>
	<div class="h-fit w-fit appearance-none" bind:this={referenceEl}>
		{@render trigger({ toggle, isOpen })}
	</div>

	<!-- Menú flotante: se muestra si isOpen es true -->
	{#if isOpen}
		<div
			bind:this={floatingEl}
			style={parseStyles(floatingStyles)}
			class={cn('absolute z-10', className)}
			transition:fly={{ y: -10, opacity: 0, duration: 200 }}
			use:autoUpdateAction={{ reference: referenceEl, update: updatePosition }}
		>
			{@render children?.({ close })}
		</div>
	{/if}
</div>
