<script>
	import DynamicSwiper from '$lib/components/DynamicSwiper.svelte';
</script>

ssss DASHBOARD

<DynamicSwiper
	data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
	slidesPerView={3}
	navigation
	pagination
	effect="coverflow"
	grabCursor
	centeredSlidesBounds
	spaceBetween={100}
	coverflowEffect={{
		rotate: -20,
		depth: 10,
		slideShadows: false,
		modifier: 10,
		stretch: 100,
		scale: 1
	}}
>
	{#snippet renderItem({ item })}
		<div class="flex h-40 w-full items-center justify-center bg-neutral-800">
			<h1>{item}</h1>
		</div>
	{/snippet}
</DynamicSwiper>
