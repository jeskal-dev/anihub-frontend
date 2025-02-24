<script lang="ts">
	import cn from '$lib/helpers/classnames';

	interface Props {
		field: string;
		labelText: string;
		hasError: boolean;
		hasValue?: boolean;
	}

	let { field, hasError, labelText, hasValue }: Props = $props();
	const labelClass = $derived(
		cn(
			' absolute left-4 pointer-events-none origin-top-left transition-all duration-200 peer-focus:translate-y-[-10px] peer-focus:scale-75',
			hasValue ? 'translate-y-[-10px] scale-75' : 'translate-y-3 scale-100',
			hasError ? 'text-red-400' : 'text-neutral-400 peer-focus:text-indigo-400'
		)
	);
</script>

<label for={field} class={labelClass}>
	<span class="rounded-md px-1 backdrop-blur-sm peer-focus:bg-neutral-800/80">
		{labelText}
	</span>
</label>
