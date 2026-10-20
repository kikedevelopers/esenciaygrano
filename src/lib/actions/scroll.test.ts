import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clamp, compute_progress, parallax, parallax_offset, scroll_progress } from './scroll';

function mock_reduced_motion(matches: boolean) {
	vi.stubGlobal(
		'matchMedia',
		vi.fn((query: string) => ({ matches, media: query }))
	);
}

function set_rect(node: HTMLElement, top: number, height: number) {
	node.getBoundingClientRect = () => ({ top, height, bottom: top + height }) as DOMRect;
}

describe('clamp', () => {
	it('limita al rango', () => {
		expect(clamp(-1)).toBe(0);
		expect(clamp(2)).toBe(1);
		expect(clamp(0.4)).toBe(0.4);
		expect(clamp(15, 0, 10)).toBe(10);
	});
});

describe('compute_progress (through)', () => {
	const vh = 800;

	it('es 0 cuando el elemento aún está debajo del viewport', () => {
		expect(compute_progress({ top: 900, height: 400 }, vh, 'through')).toBe(0);
	});

	it('es 1 cuando el elemento ya salió por arriba', () => {
		expect(compute_progress({ top: -500, height: 400 }, vh, 'through')).toBe(1);
	});

	it('es 0,5 con el elemento centrado', () => {
		expect(compute_progress({ top: 200, height: 400 }, vh, 'through')).toBe(0.5);
	});
});

describe('compute_progress (sticky)', () => {
	const vh = 800;

	it('es 0 antes de tocar el techo', () => {
		expect(compute_progress({ top: 100, height: 1600 }, vh, 'sticky')).toBe(0);
	});

	it('avanza mientras la sección recorre su altura extra', () => {
		expect(compute_progress({ top: -400, height: 1600 }, vh, 'sticky')).toBe(0.5);
	});

	it('es 1 al terminar la sección', () => {
		expect(compute_progress({ top: -2000, height: 1600 }, vh, 'sticky')).toBe(1);
	});

	it('no divide por cero si la sección no es más alta que el viewport', () => {
		expect(compute_progress({ top: 10, height: 800 }, vh, 'sticky')).toBe(0);
		expect(compute_progress({ top: -10, height: 800 }, vh, 'sticky')).toBe(1);
	});
});

describe('parallax_offset', () => {
	it('escala el desplazamiento por la velocidad', () => {
		expect(parallax_offset(200, 0.15)).toBe(30);
		expect(parallax_offset(-200, -0.1)).toBe(20);
	});

	it('es 0 con velocidad 0 o elemento centrado', () => {
		expect(parallax_offset(300, 0)).toBe(0);
		expect(parallax_offset(0, 0.5)).toBe(0);
	});
});

describe('acciones de scroll', () => {
	let frames: FrameRequestCallback[];

	beforeEach(() => {
		frames = [];
		mock_reduced_motion(false);
		vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
			frames.push(callback);
			return frames.length;
		});
		vi.stubGlobal('innerHeight', 800);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	function flush() {
		const pending = frames;
		frames = [];
		for (const callback of pending) callback(0);
	}

	it('scroll_progress escribe el progreso inicial y lo actualiza al hacer scroll', () => {
		const node = document.createElement('section');
		set_rect(node, 200, 400);
		const result = scroll_progress(node, undefined);
		expect(node.style.getPropertyValue('--progress')).toBe('0.5');

		set_rect(node, -500, 400);
		window.dispatchEvent(new Event('scroll'));
		flush();
		expect(node.style.getPropertyValue('--progress')).toBe('1');

		result?.destroy?.();
	});

	it('scroll_progress respeta un nombre de variable propio y el modo sticky', () => {
		const node = document.createElement('section');
		set_rect(node, -400, 1600);
		const result = scroll_progress(node, { mode: 'sticky', property: '--p' });
		expect(node.style.getPropertyValue('--p')).toBe('0.5');
		result?.destroy?.();
	});

	it('scroll_progress deja de actualizar tras destroy', () => {
		const node = document.createElement('section');
		set_rect(node, 200, 400);
		const result = scroll_progress(node, undefined);
		result?.destroy?.();

		set_rect(node, -500, 400);
		window.dispatchEvent(new Event('scroll'));
		flush();
		expect(node.style.getPropertyValue('--progress')).toBe('0.5');
	});

	it('scroll_progress fija el estado final con movimiento reducido', () => {
		mock_reduced_motion(true);
		const node = document.createElement('section');
		set_rect(node, 900, 400);
		const result = scroll_progress(node, undefined);
		expect(node.style.getPropertyValue('--progress')).toBe('1');
		expect(result).toBeUndefined();
	});

	it('parallax mueve el nodo según la posición de su contenedor', () => {
		const parent = document.createElement('div');
		const node = document.createElement('img');
		parent.appendChild(node);
		set_rect(parent, 600, 400); // centro a 400 px del centro del viewport
		const result = parallax(node, { speed: 0.1 });
		expect(node.style.transform).toBe('translate3d(0, 40px, 0)');

		result?.update?.({ speed: -0.1 });
		window.dispatchEvent(new Event('scroll'));
		flush();
		expect(node.style.transform).toBe('translate3d(0, -40px, 0)');

		result?.destroy?.();
		expect(node.style.transform).toBe('');
	});

	it('parallax no hace nada con movimiento reducido', () => {
		mock_reduced_motion(true);
		const node = document.createElement('img');
		const result = parallax(node, { speed: 0.3 });
		expect(node.style.transform).toBe('');
		expect(result).toBeUndefined();
	});

	it('agrupa varios eventos de scroll en un solo frame', () => {
		const node = document.createElement('section');
		set_rect(node, 200, 400);
		const result = scroll_progress(node, undefined);
		window.dispatchEvent(new Event('scroll'));
		window.dispatchEvent(new Event('scroll'));
		window.dispatchEvent(new Event('scroll'));
		expect(frames).toHaveLength(1);
		flush();
		result?.destroy?.();
	});
});
