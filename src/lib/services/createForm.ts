import { toaster } from '$lib/components/Toast/ToastState.svelte';
import { type FormOptions, type SuperForm, type SuperValidated } from 'sveltekit-superforms';
import { superForm } from 'sveltekit-superforms/client';

export const createForm = <
	T extends Record<string, unknown> = Record<string, unknown>,
	M = never,
	In extends Record<string, unknown> = T
>(
	from: SuperValidated<T, M, In> | T,
	options?: FormOptions<T, M, In>
): SuperForm<T, M> => {
	return superForm(from, {
		onError({ result }) {
			toaster.error({
				title: 'Error',
				content: result.error.message
			});
		},
		...options
	});
};
