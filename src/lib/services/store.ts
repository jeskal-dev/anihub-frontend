import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export function createPersistentStore<T>(key: string, initialValue: T): Writable<T> {
	const storedValue = browser && window.localStorage?.getItem(key);
	const parsedValue: T = storedValue ? JSON.parse(storedValue) : initialValue;

	const { subscribe, set, update } = writable<T>(parsedValue);

	function syncToStorage(value: T) {
		if (browser) window.localStorage.setItem(key, JSON.stringify(value));
	}

	subscribe((val) => syncToStorage(val));

	return {
		subscribe,
		set: (value: T) => set(value),
		update: (callback: (currentValue: T) => T) => {
			update((currentValue: T) => {
				const newValue = callback(currentValue);
				return newValue;
			});
		}
	};
}

export function createStore<T>(initialValue: T): Writable<T> {
	const { subscribe, set, update } = writable<T>(initialValue);
	return {
		subscribe,
		set: (value: T) => set(value),
		update: (callback: (currentValue: T) => T) => {
			update((currentValue: T) => {
				const newValue = callback(currentValue);
				return newValue;
			});
		}
	};
}
