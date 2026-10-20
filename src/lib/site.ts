// Datos del negocio compartidos por toda la landing (NAP para SEO local incluido).
// Fuente única: la usan la UI, el JSON-LD, el sitemap y llms.txt, así nunca se desincronizan.

export const site_url = 'https://esenciaygrano.com/';
export const business_name = 'Esencia & Grano';
export const business_alternate_name = 'La Despensa de la 21';
export const slogan = 'Lo justo. A granel.';

/** Fecha de la última revisión del contenido (señal de frescura para buscadores e IA). */
export const content_updated = '2026-10-20';

/**
 * Definición autónoma del negocio (40–60 palabras): es el bloque que citan los
 * buscadores con IA, así que debe leerse completo sin contexto alrededor.
 */
export const business_definition =
	'Esencia & Grano, La Despensa de la 21, es una tienda a granel en la Plaza de la 21 de Ibagué, Tolima. Vende más de 120 condimentos, especias, granos, semillas y frutos secos por peso, desde 100 gramos hasta el kilo, con pedidos por WhatsApp, domicilio o recogida en tienda, de lunes a sábado de 8:00 a 20:00.';

export const phone_number = '3015955518';
export const phone_display = '301 595 5518';
export const phone_e164 = `+57${phone_number}`;
export const phone_href = `tel:${phone_e164}`;

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
