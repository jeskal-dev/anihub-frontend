import { goto } from '$app/navigation';
import type { UserDto } from '$lib/api/dto/UserDto';
import { Auth } from '$lib/api/services/auth';
import {
	type LoginSchema,
	loginSchema,
	type RegisterSchema,
	registerSchema
} from '$lib/api/validations/authSchema';
import authStore from '$lib/stores/authStore';
import { createMutation } from '@tanstack/svelte-query';
import { zod } from 'sveltekit-superforms/adapters';
import type { SuperValidated } from 'sveltekit-superforms/client';
import { createForm } from './createForm';

export const createLogin = () => {
	return createMutation({
		mutationFn: Auth.login,
		onSuccess() {},
		onError() {}
	});
};

export const loginForm = (from: SuperValidated<LoginSchema, unknown, LoginSchema>) => {
	return createForm(from, {
		validators: zod(loginSchema),
		async onResult(event) {
			if (event.result.type == 'success') {
				const user: UserDto = event.result.data?.user;
				authStore.login({ user });
				await goto('/');
			}
		}
	});
};

export const registerForm = (from: SuperValidated<RegisterSchema, unknown, RegisterSchema>) => {
	return createForm(from, {
		validators: zod(registerSchema),
		async onResult(event) {
			if (event.result.type == 'success') await goto('/login');
		}
	});
};
