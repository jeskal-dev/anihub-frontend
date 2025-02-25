import { Auth } from '$lib/api/services/auth.js';
import { loginSchema } from '$lib/api/validations/authSchema';
import { tokenStore } from '$lib/stores/tokenStore.js';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));

		if (!form.valid)
			return error(400, {
				message: 'Formulario invalido'
			});

		try {
			const tokens = await Auth.login(form.data);
			tokenStore.setTokens(tokens);
			const user = await Auth.profile();
			return { form, user };
		} catch (err) {
			console.log(err);
			return error(400, err as Error);
		}
	}
};
