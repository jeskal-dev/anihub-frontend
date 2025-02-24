<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { register, type SwiperContainer } from 'swiper/element-bundle';
	register();

	interface Props<T> extends Partial<SwiperContainer> {
		data: T[];

		renderItem: Snippet<[{ item: T }]>;
	}

	let { data, slidesPerView = 1, spaceBetween = 10, renderItem, ...props }: Props<T> = $props();
</script>

<swiper-container {slidesPerView} {spaceBetween} {...props}>
	{#each data as item}
		<swiper-slide>
			{@render renderItem({ item })}
		</swiper-slide>
	{/each}
</swiper-container>
