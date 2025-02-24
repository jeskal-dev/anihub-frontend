import { Auth } from '$lib/api/services/auth.js';
import { registerSchema } from '$lib/api/validations/authSchema';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(registerSchema));
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerSchema));

		if (!form.valid)
			return error(400, {
				message: 'Formulario invalido'
			});

		try {
			await Auth.register(form.data);
			return { form };
		} catch (err) {
			return error(400, err as Error);
		}
	}
};
