import { tick } from 'svelte';
import { writable } from 'svelte/store';
import type { Toast, ToastStore, ToastType } from './Toast.types';
import { ToastUtils } from './Toast.utils.svelte';

const defaultToastConfig = {
	duration: 2000,
	type: 'info' as ToastType
};

const TOAST_TYPES = {
	SUCCESS: 'success' as const,
	ERROR: 'error' as const,
	INFO: 'info' as const,
	PROMISE: 'promise' as const
};

const toasts: ToastStore = writable<Toast[]>([]);
const timeouts = new Map<string, number>();

async function addToast(toast: Omit<Toast, 'id'>) {
	const progress = writable(0);
	const t: Toast = {
		id: ToastUtils.generateID(),
		title: toast.title,
		content: toast.content,
		duration: toast.duration ?? defaultToastConfig.duration,
		type: toast.type ?? defaultToastConfig.type,
		progressColor: toast.progressColor,
		progress
	};

	await tick();

	toasts.update((existingToasts) => [...existingToasts, t]);

	await tick();

	ToastUtils.updateProgress(t, Date.now());

	const timeout = setTimeout(() => {
		removeToast(t.id);
		timeouts.delete(t.id);
	}, t.duration);
	timeouts.set(t.id, timeout);
}

function removeToast(id: string) {
	toasts.update((existingToasts) => existingToasts.filter((t) => t.id !== id));
	const timeout = timeouts.get(id);
	if (timeout) {
		clearTimeout(timeout);
		timeouts.delete(id);
	}
}

function clearToasts() {
	toasts.set([]);
}

function clearLastToast(num: number) {
	toasts.update((existingToasts) => existingToasts.slice(-num));
}

// function updateToastConfig(newConfig: { duration: number; type: ToastType }) {
// 	defaultToastConfig.duration = newConfig.duration;
// 	defaultToastConfig.type = newConfig.type;
// }

const toaster = {
	success: (toast: Omit<Toast, 'id'>) =>
		addToast({
			...toast,
			type: TOAST_TYPES.SUCCESS,
			progressColor: toast.progressColor ?? 'bg-green-500'
		}),
	error: (toast: Omit<Toast, 'id'>) =>
		addToast({
			...toast,
			type: TOAST_TYPES.ERROR,
			progressColor: toast.progressColor ?? 'bg-red-500'
		}),
	info: (toast: Omit<Toast, 'id'>) =>
		addToast({
			...toast,
			type: TOAST_TYPES.INFO,
			progressColor: toast.progressColor ?? 'bg-indigo-600'
		}),
	show: addToast,
	close: removeToast,
	clearLast: clearLastToast,
	clearAll: clearToasts
};

export { toaster, toasts };

