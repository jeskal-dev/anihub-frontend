import { tick } from 'svelte';
import type { Action } from 'svelte/action';

function isHTMLElement(element: unknown): element is HTMLElement {
	return element instanceof HTMLElement;
}

export type PortalConfig = string | HTMLElement | undefined;
async function getTargetElement(target: PortalConfig): Promise<HTMLElement> {
	if (typeof target === 'string') {
		let targetEl = document.querySelector<HTMLElement>(target);
		if (!targetEl) {
			await tick();  
			targetEl = document.querySelector<HTMLElement>(target);
		}
		if (!targetEl) {
			throw new Error(`No element found matching CSS selector: "${target}"`);
		}
		return targetEl;
	} else if (isHTMLElement(target)) {
		return target;
	} else {
		throw new TypeError(
			`Invalid portal target type: ${target === null ? 'null' : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`
		);
	}
}

/**
 * Acción Svelte para mover un elemento a un contenedor objetivo.
 */
export const portal: Action<HTMLElement, PortalConfig> = (el, target = 'body') => {
	let targetEl: HTMLElement;

	/**
	 * Actualiza el destino del portal.
	 */
	async function update(newTarget: PortalConfig) {
		try {
			targetEl = await getTargetElement(newTarget);
			el.dataset.portal = '';
			targetEl.appendChild(el);
			el.hidden = false;
		} catch (error) {
			console.error('Portal update failed:', error);
			throw error;  
		}
	}

	/**
	 * Limpia el elemento del DOM.
	 */
	function destroy() {
		el.remove();
	}

	// Inicializar el portal
	update(target);

	return {
		update,
		destroy
	};
};
