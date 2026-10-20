import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { reveal } from './reveal';

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

interface FakeObserver {
	callback: ObserverCallback;
	options: IntersectionObserverInit | undefined;
	observe: ReturnType<typeof vi.fn>;
	unobserve: ReturnType<typeof vi.fn>;
	disconnect: ReturnType<typeof vi.fn>;
}

let observers: FakeObserver[] = [];

function mockReducedMotion(matches: boolean) {
	vi.stubGlobal(
		'matchMedia',
		vi.fn((query: string) => ({ matches, media: query }))
	);
}

function mockIntersectionObserver() {
	const FakeIntersectionObserver = vi.fn(function (
		this: FakeObserver,
		callback: ObserverCallback,
		options?: IntersectionObserverInit
	) {
		this.callback = callback;
		this.options = options;
		this.observe = vi.fn();
		this.unobserve = vi.fn();
		this.disconnect = vi.fn();
		observers.push(this);
	});
	vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
}

function createNode() {
	return document.createElement('div');
}

describe('reveal action', () => {
	beforeEach(() => {
		observers = [];
		mockReducedMotion(false);
		mockIntersectionObserver();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('marca el nodo como revelable y lo deja oculto hasta que entra en el viewport', () => {
		const node = createNode();
		reveal(node, undefined);

		expect(node.dataset.reveal).toBe('');
		expect(node.dataset.revealShow).toBeUndefined();
		expect(observers).toHaveLength(1);
		expect(observers[0].observe).toHaveBeenCalledWith(node);
	});

	it('usa el margen por defecto y un umbral del 10%', () => {
		reveal(createNode(), undefined);

		expect(observers[0].options).toEqual({ rootMargin: '-10% 0px -10% 0px', threshold: 0.1 });
	});

	it('respeta un margen personalizado', () => {
		reveal(createNode(), { margin: '0px 0px -20% 0px' });

		expect(observers[0].options?.rootMargin).toBe('0px 0px -20% 0px');
	});

	it('aplica el retraso como variable CSS para escalonar', () => {
		const node = createNode();
		reveal(node, { delay: 120 });

		expect(node.style.getPropertyValue('--reveal-delay')).toBe('120ms');
	});

	it('no define la variable de retraso cuando el retraso es 0', () => {
		const node = createNode();
		reveal(node, { delay: 0 });

		expect(node.style.getPropertyValue('--reveal-delay')).toBe('');
	});

	it('revela el nodo y deja de observarlo al cruzar el viewport', () => {
		const node = createNode();
		reveal(node, undefined);
		const [observer] = observers;

		observer.callback([{ isIntersecting: true, target: node }]);

		expect(node.dataset.revealShow).toBe('');
		expect(observer.unobserve).toHaveBeenCalledWith(node);
	});

	it('no revela el nodo mientras no intersecta', () => {
		const node = createNode();
		reveal(node, undefined);
		const [observer] = observers;

		observer.callback([{ isIntersecting: false, target: node }]);

		expect(node.dataset.revealShow).toBeUndefined();
		expect(observer.unobserve).not.toHaveBeenCalled();
	});

	it('revela de inmediato y sin observar cuando el usuario prefiere menos movimiento', () => {
		mockReducedMotion(true);
		const node = createNode();
		const result = reveal(node, { delay: 200 });

		expect(node.dataset.revealShow).toBe('');
		expect(observers).toHaveLength(0);
		expect(result).toBeUndefined();
	});

	it('revela de inmediato si el navegador no soporta IntersectionObserver', () => {
		vi.stubGlobal('IntersectionObserver', undefined);
		const node = createNode();
		const result = reveal(node, undefined);

		expect(node.dataset.revealShow).toBe('');
		expect(result).toBeUndefined();
	});

	it('desconecta el observer al destruirse', () => {
		const result = reveal(createNode(), undefined);

		result?.destroy?.();

		expect(observers[0].disconnect).toHaveBeenCalledOnce();
	});
});
