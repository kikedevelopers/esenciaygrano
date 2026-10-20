import type { Family } from './catalog';
import {
	address_line,
	business_alternate_name,
	business_definition,
	business_name,
	content_updated,
	maps_url,
	opening_hours,
	payment_methods,
	phone_display,
	phone_e164,
	site_url,
	slogan,
	whatsapp_url
} from './site';

/*
  SEO y GEO desde una sola fuente: metadatos, JSON-LD, sitemap y llms.txt
  se construyen aquí con los mismos datos que muestra la página.
*/

/** Consulta principal delante, marca al final; ≤ 60 caracteres. */
export const page_title = 'Frutos secos y granos a granel en Ibagué | Esencia & Grano';

/** 150–160 caracteres: servicio, lugar, prueba y acción. */
export const page_description =
	'Tienda a granel en la Plaza de la 21, Ibagué: frutos secos, granos, especias y semillas desde 100 g. Pide por WhatsApp con domicilio o recoge en tienda.';

export interface Faq {
	q: string;
	a: string;
}

export interface SeoImages {
	/** URLs absolutas */
	hero: string;
	logo: string;
	og: string;
	families: Record<string, string>;
}

/** Convierte una ruta de asset ("/_app/...") en URL absoluta del sitio. */
export function absolute_url(path: string): string {
	return new URL(path, site_url).href;
}

const ids = {
	store: `${site_url}#tienda`,
	website: `${site_url}#sitio`,
	webpage: `${site_url}#pagina`,
	faq: `${site_url}#preguntas`,
	logo: `${site_url}#logo`
};

export function build_json_ld(families: Family[], faqs: Faq[], images: SeoImages) {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': ids.website,
				url: site_url,
				name: business_name,
				alternateName: business_alternate_name,
				inLanguage: 'es-CO',
				publisher: { '@id': ids.store }
			},
			{
				'@type': 'WebPage',
				'@id': ids.webpage,
				url: site_url,
				name: page_title,
				description: page_description,
				inLanguage: 'es-CO',
				isPartOf: { '@id': ids.website },
				about: { '@id': ids.store },
				primaryImageOfPage: { '@type': 'ImageObject', url: images.hero },
				dateModified: content_updated
			},
			{
				'@type': 'GroceryStore',
				'@id': ids.store,
				name: business_name,
				alternateName: business_alternate_name,
				slogan,
				description: business_definition,
				url: site_url,
				logo: {
					'@type': 'ImageObject',
					'@id': ids.logo,
					url: images.logo,
					width: 512,
					height: 512
				},
				image: [images.hero, images.og, ...Object.values(images.families)],
				telephone: phone_e164,
				priceRange: '$$',
				currenciesAccepted: 'COP',
				paymentAccepted: payment_methods,
				address: {
					'@type': 'PostalAddress',
					streetAddress: 'Plaza de la 21',
					addressLocality: 'Ibagué',
					addressRegion: 'Tolima',
					addressCountry: 'CO'
				},
				hasMap: maps_url,
				areaServed: {
					'@type': 'City',
					name: 'Ibagué',
					sameAs: 'https://es.wikipedia.org/wiki/Ibagu%C3%A9'
				},
				openingHoursSpecification: [
					{
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
						opens: '08:00',
						closes: '20:00'
					}
				],
				contactPoint: {
					'@type': 'ContactPoint',
					telephone: phone_e164,
					contactType: 'customer service',
					availableLanguage: 'es',
					url: whatsapp_url()
				},
				knowsAbout: [
					'Venta a granel',
					'Frutos secos',
					'Especias y condimentos',
					'Granos y legumbres',
					'Semillas',
					'Alimentación vegana y sin gluten'
				],
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: 'Productos a granel',
					itemListElement: families.map((family) => ({
						'@type': 'OfferCatalog',
						name: family.name,
						description: family.description,
						image: images.families[family.id],
						itemListElement: family.items.map((item) => ({
							'@type': 'Offer',
							itemOffered: { '@type': 'Product', name: item, category: family.name }
						}))
					}))
				},
				potentialAction: {
					'@type': 'OrderAction',
					name: 'Hacer un pedido por WhatsApp',
					target: {
						'@type': 'EntryPoint',
						urlTemplate: whatsapp_url(),
						actionPlatform: [
							'https://schema.org/DesktopWebPlatform',
							'https://schema.org/MobileWebPlatform'
						]
					},
					deliveryMethod: [
						'https://schema.org/OnSitePickup',
						'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet'
					]
				}
			},
			{
				'@type': 'FAQPage',
				'@id': ids.faq,
				isPartOf: { '@id': ids.webpage },
				mainEntity: faqs.map((faq) => ({
					'@type': 'Question',
					name: faq.q,
					acceptedAnswer: { '@type': 'Answer', text: faq.a }
				}))
			}
		]
	};
}

/** Serializa el JSON-LD de forma segura para incrustarlo en un <script>. */
export function serialize_json_ld(data: unknown): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}

function escape_xml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export interface SitemapImage {
	loc: string;
	title: string;
}

/** Sitemap con extensión de imágenes (búsqueda de imágenes y Google Lens). */
export function build_sitemap(images: SitemapImage[], lastmod = content_updated): string {
	const image_tags = images
		.map(
			(image) =>
				`\t\t<image:image>\n\t\t\t<image:loc>${escape_xml(image.loc)}</image:loc>\n\t\t\t<image:title>${escape_xml(image.title)}</image:title>\n\t\t</image:image>`
		)
		.join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
	<url>
		<loc>${escape_xml(site_url)}</loc>
		<lastmod>${lastmod}</lastmod>
${image_tags}
	</url>
</urlset>
`;
}

/** llms.txt (llmstxt.org): resumen para asistentes de IA, con los hechos verificables del negocio. */
export function build_llms_txt(families: Family[]): string {
	const catalog = families.map((f) => `- ${f.name}: ${f.items.join(', ')}.`).join('\n');
	return `# ${business_name}

> ${business_definition}

## Datos clave

- Nombre: ${business_name} (${business_alternate_name})
- Tipo: tienda de productos a granel (condimentos, especias, granos, semillas y frutos secos)
- Dirección: ${address_line}, Colombia
- Mapa: ${maps_url}
- Horario: ${opening_hours}
- Teléfono y WhatsApp: ${phone_display} (${phone_e164})
- Pedidos: por WhatsApp, ${whatsapp_url()}
- Entrega: domicilio coordinado por WhatsApp o recogida en la Plaza de la 21
- Pagos: ${payment_methods}
- Cantidades: desde 100 g hasta el kilo; volumen para negocios bajo pedido
- Catálogo: más de 120 productos a granel
- Información actualizada: ${content_updated}

## Ejemplos del catálogo

${catalog}

## Páginas

- [Inicio](${site_url}): la despensa, el armador de pedidos por WhatsApp, preguntas frecuentes y cómo llegar
- [Versión completa para IA](${site_url}llms-full.txt): todo el contenido en texto plano

## Notas

- Los precios no se publican en la web; se confirman por WhatsApp según el peso pedido.
- Las imágenes de producto del sitio son ilustrativas.
`;
}

/** llms-full.txt: el contenido completo de la página en un solo documento. */
export function build_llms_full_txt(families: Family[], faqs: Faq[]): string {
	const family_blocks = families
		.map(
			(f) => `### ${f.name}\n\n${f.headline} ${f.description}\n\nEjemplos: ${f.items.join(', ')}.`
		)
		.join('\n\n');
	const faq_blocks = faqs.map((faq) => `### ${faq.q}\n\n${faq.a}`).join('\n\n');
	return `${build_llms_txt(families)}
## La despensa

${family_blocks}

## Para quién

- Para tu casa: lleva 100 gramos para probar o el kilo de la semana. Pagas solo lo que usas.
- Para tu dieta: semillas, integrales, legumbres y frutos secos naturales para cocina vegana, sin gluten o alta en proteína.
- Para tu negocio: restaurantes, panaderías y emprendedores piden cantidades por volumen, coordinadas por WhatsApp.

## Cómo pedir

1. Escríbenos por WhatsApp (${phone_display}) o arma la lista en ${site_url}#pedido.
2. Pesamos cada producto en la cantidad exacta que pediste.
3. Coordinamos el domicilio o lo dejamos listo para recoger en la Plaza de la 21.

## Preguntas frecuentes

${faq_blocks}
`;
}
