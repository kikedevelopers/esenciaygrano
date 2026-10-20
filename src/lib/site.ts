// Datos del negocio compartidos por toda la landing (NAP para SEO local incluido).

export const phone_number = '3015955518';
export const phone_display = '301 595 5518';
export const phone_href = `tel:+57${phone_number}`;

export const address_line = 'Plaza de la 21, Ibagué – Tolima';
export const maps_url =
	'https://www.google.com/maps/search/?api=1&query=Plaza+de+la+21+Ibagu%C3%A9+Tolima';

export const opening_hours = 'Lun a Sáb · 8:00 – 20:00';
export const payment_methods = 'Efectivo, transferencia y Nequi';

/** Enlace de WhatsApp con un mensaje opcional ya escrito. */
export function whatsapp_url(message?: string): string {
	const base = `https://wa.me/57${phone_number}`;
	return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const default_whatsapp_message = 'Hola, quiero hacer un pedido en Esencia & Grano.';
