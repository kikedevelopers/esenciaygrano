import { describe, expect, it } from 'vitest';
import {
	absolute_url,
	build_json_ld,
	build_llms_full_txt,
	build_llms_txt,
	build_sitemap,
	page_description,
	page_title,
	serialize_json_ld,
	type SeoImages
} from './seo';
import { business_definition, content_updated, phone_e164, site_url } from './site';
import { faqs } from './faqs';
import type { Family } from './catalog';

const families: Family[] = [
	{
		id: 'granos',
		name: 'Granos',
		headline: 'La base de la mesa.',
		description: 'Legumbres y cereales.',
		items: ['Lentejas', 'Quinua'],
		image: { src: '/img/granos.webp', srcset: '', alt: 'Granos' }
	},
	{
		id: 'frutos-secos',
		name: 'Frutos secos',
		headline: 'Energía.',
		description: 'Nueces y almendras.',
		items: ['Almendras'],
		image: { src: '/img/frutos.webp', srcset: '', alt: 'Frutos secos' }
	}
];

const images: SeoImages = {
	hero: 'https://esenciaygrano.com/hero.webp',
	logo: 'https://esenciaygrano.com/icon-512.png',
	og: 'https://esenciaygrano.com/og-image.jpg',
	families: {
		granos: 'https://esenciaygrano.com/img/granos.webp',
		'frutos-secos': 'https://esenciaygrano.com/img/frutos.webp'
	}
};

type Node = Record<string, any>;
const graph = build_json_ld(families, faqs, images)['@graph'] as Node[];
const node = (type: string) => graph.find((n) => n['@type'] === type) as Node;

describe('metadatos', () => {
	it('el título cabe en el resultado de búsqueda y lleva consulta, ciudad y marca', () => {
		expect(page_title.length).toBeLessThanOrEqual(60);
		expect(page_title).toMatch(/granel/i);
		expect(page_title).toContain('Ibagué');
		expect(page_title).toContain('Esencia & Grano');
	});

	it('la descripción mide entre 120 y 160 caracteres y nombra la acción', () => {
		expect(page_description.length).toBeGreaterThanOrEqual(120);
		expect(page_description.length).toBeLessThanOrEqual(160);
		expect(page_description).toContain('WhatsApp');
	});

	it('la definición del negocio es un bloque citable de 40 a 60 palabras', () => {
		const words = business_definition.split(/\s+/).length;
		expect(words).toBeGreaterThanOrEqual(40);
		expect(words).toBeLessThanOrEqual(60);
		expect(business_definition).toContain('Ibagué');
	});

	it('la URL canónica es https y termina en barra (igual que el sitemap)', () => {
		expect(site_url).toBe('https://esenciaygrano.com/');
	});

	it('la fecha de actualización es ISO válida', () => {
		expect(content_updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		expect(Number.isNaN(Date.parse(content_updated))).toBe(false);
	});
});

describe('absolute_url', () => {
	it('resuelve rutas de assets contra el dominio', () => {
		expect(absolute_url('/_app/a.webp')).toBe('https://esenciaygrano.com/_app/a.webp');
	});

	it('respeta URLs que ya son absolutas', () => {
		expect(absolute_url('https://cdn.example.com/x.png')).toBe('https://cdn.example.com/x.png');
	});
});

describe('build_json_ld', () => {
	it('publica un grafo con WebSite, WebPage, GroceryStore y FAQPage', () => {
		expect(graph.map((n) => n['@type'])).toEqual(['WebSite', 'WebPage', 'GroceryStore', 'FAQPage']);
	});

	it('enlaza los nodos por @id', () => {
		const store = node('GroceryStore');
		expect(node('WebSite').publisher['@id']).toBe(store['@id']);
		expect(node('WebPage').about['@id']).toBe(store['@id']);
		expect(node('WebPage').isPartOf['@id']).toBe(node('WebSite')['@id']);
		expect(node('FAQPage').isPartOf['@id']).toBe(node('WebPage')['@id']);
	});

	it('mantiene el NAP coherente con los datos del negocio', () => {
		const store = node('GroceryStore');
		expect(store.telephone).toBe(phone_e164);
		expect(store.contactPoint.telephone).toBe(phone_e164);
		expect(store.address.addressLocality).toBe('Ibagué');
		expect(store.address.addressCountry).toBe('CO');
		expect(store.description).toBe(business_definition);
	});

	it('usa el logo real y no la imagen social como logo', () => {
		expect(node('GroceryStore').logo.url).toBe(images.logo);
	});

	it('declara el horario de lunes a sábado', () => {
		const [hours] = node('GroceryStore').openingHoursSpecification;
		expect(hours.dayOfWeek).toHaveLength(6);
		expect(hours.dayOfWeek).not.toContain('Sunday');
		expect(hours.opens).toBe('08:00');
		expect(hours.closes).toBe('20:00');
	});

	it('incluye el catálogo por familias sin inventar precios ni stock', () => {
		const catalog = node('GroceryStore').hasOfferCatalog;
		expect(catalog.itemListElement).toHaveLength(families.length);
		const offers = catalog.itemListElement.flatMap((f: Node) => f.itemListElement);
		expect(offers.map((o: Node) => o.itemOffered.name)).toEqual([
			'Lentejas',
			'Quinua',
			'Almendras'
		]);
		for (const offer of offers) {
			expect(offer).not.toHaveProperty('price');
			expect(offer).not.toHaveProperty('availability');
		}
	});

	it('expone el pedido por WhatsApp como acción', () => {
		const action = node('GroceryStore').potentialAction;
		expect(action['@type']).toBe('OrderAction');
		expect(action.target.urlTemplate).toBe('https://wa.me/573015955518');
	});

	it('refleja todas las preguntas frecuentes', () => {
		const questions = node('FAQPage').mainEntity;
		expect(questions).toHaveLength(faqs.length);
		expect(questions[0].name).toBe(faqs[0].q);
		expect(questions[0].acceptedAnswer.text).toBe(faqs[0].a);
	});
});

describe('serialize_json_ld', () => {
	it('escapa "<" para que el contenido no pueda cerrar el <script>', () => {
		const out = serialize_json_ld({ text: '</script><script>alert(1)</script>' });
		expect(out).not.toContain('</script>');
		expect(JSON.parse(out).text).toBe('</script><script>alert(1)</script>');
	});
});

describe('build_sitemap', () => {
	const xml = build_sitemap([
		{ loc: 'https://esenciaygrano.com/a.webp', title: 'Frutos secos & especias' }
	]);

	it('declara la URL canónica con la fecha de actualización', () => {
		expect(xml).toContain(`<loc>${site_url}</loc>`);
		expect(xml).toContain(`<lastmod>${content_updated}</lastmod>`);
	});

	it('incluye la extensión de imágenes', () => {
		expect(xml).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
		expect(xml).toContain('<image:loc>https://esenciaygrano.com/a.webp</image:loc>');
	});

	it('escapa caracteres XML', () => {
		expect(xml).toContain('Frutos secos &amp; especias');
		expect(xml).not.toContain('secos & especias');
	});

	it('acepta una fecha propia y una lista sin imágenes', () => {
		const empty = build_sitemap([], '2027-01-01');
		expect(empty).toContain('<lastmod>2027-01-01</lastmod>');
		expect(empty).not.toContain('<image:image>');
	});
});

describe('llms.txt', () => {
	const txt = build_llms_txt(families);

	it('empieza con el nombre y la definición como cita (formato llmstxt.org)', () => {
		expect(txt.startsWith('# Esencia & Grano\n\n> ')).toBe(true);
		expect(txt).toContain(business_definition);
	});

	it('incluye los datos de contacto, horario y catálogo', () => {
		expect(txt).toContain('301 595 5518');
		expect(txt).toContain('Lun a Sáb');
		expect(txt).toContain('- Granos: Lentejas, Quinua.');
		expect(txt).toContain(`${site_url}llms-full.txt`);
	});

	it('la versión completa añade familias, proceso y todas las preguntas', () => {
		const full = build_llms_full_txt(families, faqs);
		expect(full).toContain(txt);
		expect(full).toContain('### Frutos secos');
		expect(full).toContain('## Cómo pedir');
		for (const faq of faqs) expect(full).toContain(faq.q);
	});
});
