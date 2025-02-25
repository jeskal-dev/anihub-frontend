<script>
	import cn from '$lib/helpers/classnames';
	import { Motion } from 'svelte-motion';

	let { href = '', class: className = '', label = '' } = $props();
</script>

<Motion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} let:motion>
	<a use:motion {href} class={cn('rounded-md px-4 py-2', className)}>
		{label}
	</a>
</Motion>
