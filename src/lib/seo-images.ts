import hero_2048 from '$lib/assets/img/hero-2048.webp';
import { families } from './catalog';
import { absolute_url, type SeoImages, type SitemapImage } from './seo';

// URLs absolutas de las imágenes para JSON-LD, Open Graph y el sitemap de imágenes.

export const seo_images: SeoImages = {
	hero: absolute_url(hero_2048),
	logo: absolute_url('/icon-512.png'),
	og: absolute_url('/og-image.jpg'),
	families: Object.fromEntries(families.map((f) => [f.id, absolute_url(f.image.src)]))
};

export const sitemap_images: SitemapImage[] = [
	{
		loc: seo_images.hero,
		title: 'Frutos secos, especias y granos a granel en Esencia & Grano, Ibagué'
	},
	...families.map((f) => ({
		loc: seo_images.families[f.id],
		title: `${f.name} a granel en Ibagué`
	})),
	{ loc: seo_images.og, title: 'Esencia & Grano, La Despensa de la 21' }
];
