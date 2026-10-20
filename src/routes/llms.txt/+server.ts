import { families } from '$lib/catalog';
import { build_llms_txt } from '$lib/seo';

export const prerender = true;

export function GET() {
	return new Response(build_llms_txt(families), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
