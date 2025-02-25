<script lang="ts">
	import { goto } from '$app/navigation';
	import type { RegisterSchema } from '$lib/api/validations/authSchema';
	import AnimatedFormField from '$lib/components/AnimatedFormField/AnimatedFormField.svelte';
	import { getEntries } from '$lib/helpers/getEntires.js';
	import { withPrevent } from '$lib/helpers/withPrevent.js';
	import { registerForm } from '$lib/services/auth.js';
	import { Motion } from 'svelte-motion';

	const FIELD_LABELS: Record<keyof RegisterSchema, string> = {
		username: 'Nombre de usuario',
		email: 'Correo electrónico',
		password: 'Contraseña',
		confirmPassword: 'Confirmar contraseña'
	};
	let { data } = $props();

	const navigate = (href: string) => withPrevent(() => goto(href));
	const { form, errors, enhance } = registerForm(data.form);
</script>

<Motion
	initial={{ opacity: 0, scale: 0.8 }}
	animate={{ opacity: 1, scale: 1 }}
	transition={{ type: 'spring', stiffness: 100 }}
	let:motion
>
	<div
		use:motion
		class="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-neutral-800/80 p-8 shadow-2xl backdrop-blur-lg"
	>
		<div class="mb-8 flex flex-col items-center">
			<Motion
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2 }}
				let:motion
			>
				<h2
					use:motion
					class="mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent"
				>
					Únete a la comunidad
				</h2>
			</Motion>
			<Motion
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.3 }}
				let:motion
			>
				<p use:motion class="text-neutral-400">Crea tu cuenta y comienza la aventura</p>
			</Motion>
		</div>

		<form class="space-y-4" method="POST" use:enhance>
			{#each getEntries(FIELD_LABELS) as [field, label], index}
				<AnimatedFormField
					name={field}
					type={field == 'password' ? 'password' : 'text'}
					{index}
					error={$errors[field]?.at(0)}
					bind:value={$form[field]}
					{label}
				/>
			{/each}

			<Motion whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} let:motion>
				<button
					use:motion
					type="submit"
					class="relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-600/30"
				>
					<span class="relative z-10">Crear cuenta gratis</span>
					<Motion
						initial={{ x: '-100%' }}
						animate={{ x: '100%' }}
						transition={{
							repeat: Infinity,
							duration: 1.5,
							ease: 'linear'
						}}
						let:motion
					>
						<div
							use:motion
							class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
						></div>
					</Motion>
				</button>
			</Motion>
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-white/10"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="bg-neutral-800/40 px-2 text-neutral-400"> o continúa con </span>
				</div>
			</div>
			<p class="text-center text-neutral-400">
				¿Ya tienes cuenta?{' '}
				<Motion let:motion whileHover={{ scale: 1.05 }}>
					<button
						type="button"
						use:motion
						role="link"
						onclick={navigate('/login')}
						class="inline-block cursor-pointer text-indigo-400 hover:underline"
						>Inicia sesión</button
					>
				</Motion>
			</p>
		</form>
	</div>
</Motion>
