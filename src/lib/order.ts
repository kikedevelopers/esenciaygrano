import { whatsapp_url } from './site';

// Lógica del armador de pedidos: el pedido se envía como mensaje de WhatsApp.

export const gram_options = [100, 250, 500, 1000] as const;
export type Grams = (typeof gram_options)[number];

export const default_grams: Grams = 250;

export interface OrderLine {
	product: string;
	grams: Grams;
}

export function is_valid_grams(value: number): value is Grams {
	return (gram_options as readonly number[]).includes(value);
}

/** 100 → "100 g", 1000 → "1 kg", 2500 → "2,5 kg". */
export function format_grams(grams: number): string {
	if (!Number.isFinite(grams) || grams < 0) throw new RangeError(`Cantidad inválida: ${grams}`);
	if (grams < 1000) return `${grams} g`;
	const kilos = grams / 1000;
	return `${Number.isInteger(kilos) ? kilos : kilos.toLocaleString('es-CO')} kg`;
}

/** Añade el producto o, si ya estaba, lo quita (comportamiento de chip seleccionable). */
export function toggle_product(lines: OrderLine[], product: string): OrderLine[] {
	const name = product.trim();
	if (!name) return lines;
	return lines.some((line) => line.product === name)
		? lines.filter((line) => line.product !== name)
		: [...lines, { product: name, grams: default_grams }];
}

export function set_grams(lines: OrderLine[], product: string, grams: number): OrderLine[] {
	if (!is_valid_grams(grams)) throw new RangeError(`Cantidad no disponible: ${grams}`);
	return lines.map((line) => (line.product === product ? { ...line, grams } : line));
}

export function total_grams(lines: OrderLine[]): number {
	return lines.reduce((sum, line) => sum + line.grams, 0);
}

export function build_order_message(lines: OrderLine[]): string {
	if (lines.length === 0) throw new Error('El pedido está vacío');
	const items = lines.map((line) => `• ${line.product}: ${format_grams(line.grams)}`).join('\n');
	return `Hola, Esencia & Grano. Quiero hacer este pedido:\n\n${items}\n\nTotal aproximado: ${format_grams(total_grams(lines))}.\n¿Me confirman disponibilidad y si es para domicilio o para recoger?`;
}

export function build_order_url(lines: OrderLine[]): string {
	return whatsapp_url(build_order_message(lines));
}
