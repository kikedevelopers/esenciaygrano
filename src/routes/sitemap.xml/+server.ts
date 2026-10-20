import { build_sitemap } from '$lib/seo';
import { sitemap_images } from '$lib/seo-images';

export const prerender = true;

export function GET() {
	return new Response(build_sitemap(sitemap_images), {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
