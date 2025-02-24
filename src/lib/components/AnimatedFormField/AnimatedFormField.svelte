<script lang="ts">
	import cn from '$lib/helpers/classnames';
	import { Motion } from 'svelte-motion';
	import ErrorDisplay from './ErrorDisplay.svelte';
	import Label from './Label.svelte';

	interface Props {
		index?: number;
		name: string;
		type?: string;
		label: string;
		value?: any;
		error?: string;
		placeholder?: string;
	}

	let {
		name,
		type = 'text',
		label,
		value = $bindable(''),
		error,
		index = 0,
		placeholder
	}: Props = $props();

	let hasError = $derived(!!error);
	let hasValue = $derived(!!value);
	let inputClass = $derived(
		cn(
			' w-full px-4 py-3 bg-black/30 rounded-lg text-white border transition-all peer placeholder-transparent outline-none',
			{
				'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30': hasError,
				'border-indigo-400/10 focus:border-indigo-400': !hasError
			}
		)
	);
</script>

<Motion
	initial={{ opacity: 0, x: -20 }}
	animate={{ opacity: 1, x: 0 }}
	transition={{ delay: 0.3 + index * 0.1 }}
	let:motion
>
	<div use:motion class="relative">
		<div class="group relative z-0 mb-10">
			<input
				id={name}
				{name}
				{type}
				aria-describedby={`${name}-error`}
				bind:value
				{placeholder}
				class={inputClass}
			/>
			<Label field={name} labelText={label} {hasError} {hasValue} />
			{#if hasError}
				<ErrorDisplay field={name} message={error} />
			{/if}
		</div>
	</div>
</Motion>
