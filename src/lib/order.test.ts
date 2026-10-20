import { describe, expect, it } from 'vitest';
import {
	build_order_message,
	build_order_url,
	default_grams,
	format_grams,
	is_valid_grams,
	set_grams,
	toggle_product,
	total_grams,
	type OrderLine
} from './order';

const lines: OrderLine[] = [
	{ product: 'Comino', grams: 100 },
	{ product: 'Almendras', grams: 500 }
];

describe('format_grams', () => {
	it('muestra gramos por debajo del kilo', () => {
		expect(format_grams(0)).toBe('0 g');
		expect(format_grams(250)).toBe('250 g');
		expect(format_grams(999)).toBe('999 g');
	});

	it('muestra kilos enteros sin decimales', () => {
		expect(format_grams(1000)).toBe('1 kg');
		expect(format_grams(3000)).toBe('3 kg');
	});

	it('muestra kilos con decimales en formato colombiano', () => {
		expect(format_grams(2500)).toBe('2,5 kg');
	});

	it('rechaza cantidades negativas o no numéricas', () => {
		expect(() => format_grams(-1)).toThrow(RangeError);
		expect(() => format_grams(Number.NaN)).toThrow(RangeError);
		expect(() => format_grams(Infinity)).toThrow(RangeError);
	});
});

describe('is_valid_grams', () => {
	it('acepta solo las cantidades ofrecidas', () => {
		expect(is_valid_grams(100)).toBe(true);
		expect(is_valid_grams(1000)).toBe(true);
		expect(is_valid_grams(300)).toBe(false);
		expect(is_valid_grams(0)).toBe(false);
	});
});

describe('toggle_product', () => {
	it('añade un producto nuevo con la cantidad por defecto', () => {
		expect(toggle_product([], 'Quinua')).toEqual([{ product: 'Quinua', grams: default_grams }]);
	});

	it('quita un producto que ya estaba', () => {
		expect(toggle_product(lines, 'Comino')).toEqual([{ product: 'Almendras', grams: 500 }]);
	});

	it('recorta espacios del nombre', () => {
		expect(toggle_product([], '  Chía ')).toEqual([{ product: 'Chía', grams: default_grams }]);
	});

	it('ignora nombres vacíos', () => {
		expect(toggle_product(lines, '   ')).toBe(lines);
	});

	it('no muta la lista original', () => {
		const original = structuredClone(lines);
		toggle_product(lines, 'Quinua');
		expect(lines).toEqual(original);
	});
});

describe('set_grams', () => {
	it('cambia la cantidad del producto indicado', () => {
		expect(set_grams(lines, 'Comino', 1000)).toEqual([
			{ product: 'Comino', grams: 1000 },
			{ product: 'Almendras', grams: 500 }
		]);
	});

	it('deja la lista igual si el producto no existe', () => {
		expect(set_grams(lines, 'Quinua', 250)).toEqual(lines);
	});

	it('rechaza cantidades no ofrecidas', () => {
		expect(() => set_grams(lines, 'Comino', 333)).toThrow(RangeError);
	});
});

describe('total_grams', () => {
	it('suma las cantidades', () => {
		expect(total_grams(lines)).toBe(600);
	});

	it('es 0 con la lista vacía', () => {
		expect(total_grams([])).toBe(0);
	});
});

describe('build_order_message', () => {
	it('lista cada producto con su cantidad y el total', () => {
		const message = build_order_message(lines);
		expect(message).toContain('• Comino: 100 g');
		expect(message).toContain('• Almendras: 500 g');
		expect(message).toContain('Total aproximado: 600 g.');
		expect(message).toContain('domicilio o para recoger');
	});

	it('falla con el pedido vacío', () => {
		expect(() => build_order_message([])).toThrow('El pedido está vacío');
	});
});

describe('build_order_url', () => {
	it('genera un enlace de WhatsApp al número de la tienda con el mensaje codificado', () => {
		const url = new URL(build_order_url(lines));
		expect(url.origin).toBe('https://wa.me');
		expect(url.pathname).toBe('/573015955518');
		expect(url.searchParams.get('text')).toBe(build_order_message(lines));
	});
});
