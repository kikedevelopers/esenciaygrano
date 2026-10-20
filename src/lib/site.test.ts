import { describe, expect, it } from 'vitest';
import { phone_href, whatsapp_url } from './site';

describe('whatsapp_url', () => {
	it('sin mensaje apunta solo al número', () => {
		expect(whatsapp_url()).toBe('https://wa.me/573015955518');
	});

	it('codifica el mensaje, incluidos acentos, & y saltos de línea', () => {
		const url = new URL(whatsapp_url('Hola, Esencia & Grano.\n¿Tienen maní?'));
		expect(url.searchParams.get('text')).toBe('Hola, Esencia & Grano.\n¿Tienen maní?');
	});

	it('trata el mensaje vacío como sin mensaje', () => {
		expect(whatsapp_url('')).toBe('https://wa.me/573015955518');
	});
});

describe('phone_href', () => {
	it('usa el prefijo internacional de Colombia', () => {
		expect(phone_href).toBe('tel:+573015955518');
	});
});
