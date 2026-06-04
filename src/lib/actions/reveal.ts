import type { Action } from 'svelte/action';

interface RevealOptions {
	/** Retraso en ms antes de revelar (útil para escalonar) */
	delay?: number;
	/** Margen del root para disparar antes de entrar del todo */
	margin?: string;
}

/**
 * Revela un elemento al entrar en el viewport una única vez.
 * El movimiento se anula bajo prefers-reduced-motion (solo opacidad),
 * siguiendo la guía de accesibilidad de animación.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	const { delay = 0, margin = '-10% 0px -10% 0px' } = options ?? {};

	node.dataset.reveal = '';
	if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);

	const reduceMotion =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (reduceMotion || typeof IntersectionObserver === 'undefined') {
		node.dataset.revealShow = '';
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.dataset.revealShow = '';
					observer.unobserve(node);
				}
			}
		},
		{ rootMargin: margin, threshold: 0.1 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
