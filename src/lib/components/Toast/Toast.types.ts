import type { Writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info'  ;

export interface Toast {
	id: string;
	title: string;
	content: string | Promise<string>;
	duration?: number;
	type?: ToastType;
	progressColor?: string;
	progress?: Writable<number>;
}

export type ToastStore = Writable<Toast[]>;
