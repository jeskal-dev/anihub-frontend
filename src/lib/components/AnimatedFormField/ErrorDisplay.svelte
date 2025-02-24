<script lang="ts">
	import { Motion } from 'svelte-motion';

	interface Props {
		message?: string;
		field: string;
	}

	let { message, field }: Props = $props();
</script>

<Motion initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} let:motion>
	<p
		id={`${field}-error`}
		use:motion
		class="absolute mt-1 flex items-center gap-2 text-sm text-red-400"
	>
		<svg class="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
			/>
		</svg>
		{message}
	</p>
</Motion>
