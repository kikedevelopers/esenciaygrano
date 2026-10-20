import type { Action } from 'svelte/action';

/*
  Motor de scroll compartido: un único listener pasivo y un único rAF por frame,
  aunque haya muchos elementos suscritos. Solo escribe transform u opacidad vía
  variables locales, nunca lee layout dentro del bucle salvo getBoundingClientRect
  por elemento suscrito.
*/

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();
let frame_requested = false;
let listening = false;

function run() {
	frame_requested = false;
	for (const update of subscribers) update();
}

function request_frame() {
	if (frame_requested) return;
	frame_requested = true;
	requestAnimationFrame(run);
}

function subscribe(update: Subscriber): () => void {
	subscribers.add(update);
	if (!listening) {
		window.addEventListener('scroll', request_frame, { passive: true });
		window.addEventListener('resize', request_frame, { passive: true });
		listening = true;
	}
	update();
	return () => {
		subscribers.delete(update);
		if (subscribers.size === 0 && listening) {
			window.removeEventListener('scroll', request_frame);
			window.removeEventListener('resize', request_frame);
			listening = false;
		}
	};
}

export function prefers_reduced_motion(): boolean {
	return (
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}

export function clamp(value: number, min = 0, max = 1): number {
	return Math.min(max, Math.max(min, value));
}

/**
 * Progreso 0→1 de un elemento a través del viewport.
 * mode "through": 0 cuando su borde superior entra por abajo, 1 cuando su borde inferior sale por arriba.
 * mode "sticky": 0 cuando su borde superior toca el techo, 1 cuando su borde inferior toca el suelo
 * (útil para secciones altas con contenido sticky).
 */
export function compute_progress(
	rect: { top: number; height: number },
	viewport_height: number,
	mode: 'through' | 'sticky'
): number {
	if (mode === 'sticky') {
		const distance = rect.height - viewport_height;
		if (distance <= 0) return rect.top <= 0 ? 1 : 0;
		return clamp(-rect.top / distance);
	}
	return clamp((viewport_height - rect.top) / (viewport_height + rect.height));
}

interface ProgressOptions {
	mode?: 'through' | 'sticky';
	/** Nombre de la variable CSS escrita en el nodo. */
	property?: string;
}

/** Escribe el progreso de scroll del nodo en una variable CSS (por defecto --progress). */
export const scroll_progress: Action<HTMLElement, ProgressOptions | undefined> = (
	node,
	options
) => {
	const { mode = 'through', property = '--progress' } = options ?? {};

	if (prefers_reduced_motion()) {
		node.style.setProperty(property, '1');
		return;
	}

	let last = -1;
	const unsubscribe = subscribe(() => {
		const value = compute_progress(node.getBoundingClientRect(), window.innerHeight, mode);
		const rounded = Math.round(value * 1000) / 1000;
		if (rounded !== last) {
			last = rounded;
			node.style.setProperty(property, String(rounded));
		}
	});

	return { destroy: unsubscribe };
};

/** Desplazamiento de parallax en px para un elemento cuyo centro está a `offset` px del centro del viewport. */
export function parallax_offset(offset: number, speed: number): number {
	return Math.round(offset * speed * 10) / 10;
}

interface ParallaxOptions {
	/** Fracción del desplazamiento relativo: 0.15 se mueve un 15% más lento que el scroll. */
	speed?: number;
}

/** Parallax vertical por transform; se desactiva con prefers-reduced-motion. */
export const parallax: Action<HTMLElement, ParallaxOptions | undefined> = (node, options) => {
	let speed = options?.speed ?? 0.15;
	if (prefers_reduced_motion()) return;

	const unsubscribe = subscribe(() => {
		const rect = node.parentElement?.getBoundingClientRect() ?? node.getBoundingClientRect();
		const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
		node.style.transform = `translate3d(0, ${parallax_offset(offset, speed)}px, 0)`;
	});

	return {
		update(next) {
			speed = next?.speed ?? 0.15;
		},
		destroy() {
			unsubscribe();
			node.style.transform = '';
		}
	};
};
