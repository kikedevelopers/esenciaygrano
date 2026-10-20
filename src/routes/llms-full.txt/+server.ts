import { families } from '$lib/catalog';
import { faqs } from '$lib/faqs';
import { build_llms_full_txt } from '$lib/seo';

export const prerender = true;

export function GET() {
	return new Response(build_llms_full_txt(families, faqs), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
