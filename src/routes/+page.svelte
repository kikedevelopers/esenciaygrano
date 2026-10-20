<script lang="ts">
	import Navbar from '$lib/components/site/navbar.svelte';
	import Hero from '$lib/components/site/hero.svelte';
	import Manifesto from '$lib/components/site/manifesto.svelte';
	import Pantry from '$lib/components/site/pantry.svelte';
	import Audiences from '$lib/components/site/audiences.svelte';
	import OrderBuilder from '$lib/components/site/order-builder.svelte';
	import Essence from '$lib/components/site/essence.svelte';
	import Process from '$lib/components/site/process.svelte';
	import Faq from '$lib/components/site/faq.svelte';
	import Visit from '$lib/components/site/visit.svelte';
	import Footer from '$lib/components/site/footer.svelte';
	import MobileOrderBar from '$lib/components/site/mobile-order-bar.svelte';
	import hero_828 from '$lib/assets/img/hero-828.webp';
	import hero_1280 from '$lib/assets/img/hero-1280.webp';
	import hero_2048 from '$lib/assets/img/hero-2048.webp';
	import geist_latin from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url';
	import { families } from '$lib/catalog';
	import { faqs } from '$lib/faqs';
	import { business_name, content_updated, site_url } from '$lib/site';
	import { build_json_ld, page_description, page_title, serialize_json_ld } from '$lib/seo';
	import { seo_images } from '$lib/seo-images';

	const og_image_alt =
		'Esencia & Grano: frutos secos, especias y granos a granel en la Plaza de la 21, Ibagué';

	// Datos estructurados (JSON-LD): grafo WebSite + WebPage + GroceryStore + FAQPage.
	const json_ld_script = `<script type="application/ld+json">${serialize_json_ld(
		build_json_ld(families, faqs, seo_images)
	)}<\/script>`;
</script>

<svelte:head>
	<title>{page_title}</title>
	<meta name="description" content={page_description} />
	<link rel="canonical" href={site_url} />
	<meta
		name="robots"
		content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
	/>
	<meta name="author" content={business_name} />
	<meta name="theme-color" content="#0d0612" />
	<meta name="format-detection" content="telephone=yes" />
	<link rel="alternate" type="text/plain" href="{site_url}llms.txt" title="Resumen para IA" />

	<!-- Rendimiento: la imagen del hero y la fuente son el LCP -->
	<link
		rel="preload"
		as="image"
		href={hero_1280}
		imagesrcset="{hero_828} 828w, {hero_1280} 1280w, {hero_2048} 2048w"
		imagesizes="100vw"
		fetchpriority="high"
	/>
	<link rel="preload" as="font" type="font/woff2" href={geist_latin} crossorigin="anonymous" />

	<!-- Geolocalización para SEO local -->
	<meta name="geo.region" content="CO-TOL" />
	<meta name="geo.placename" content="Ibagué, Tolima" />

	<!-- Open Graph -->
	<meta property="og:site_name" content={business_name} />
	<meta property="og:title" content={page_title} />
	<meta property="og:description" content={page_description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={site_url} />
	<meta property="og:locale" content="es_CO" />
	<meta property="og:updated_time" content={content_updated} />
	<meta property="og:image" content={seo_images.og} />
	<meta property="og:image:secure_url" content={seo_images.og} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={og_image_alt} />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={page_title} />
	<meta name="twitter:description" content={page_description} />
	<meta name="twitter:image" content={seo_images.og} />
	<meta name="twitter:image:alt" content={og_image_alt} />

	{@html json_ld_script}
</svelte:head>

<Navbar />

<main>
	<Hero />
	<Manifesto />
	<Pantry />
	<Audiences />
	<OrderBuilder />
	<Essence />
	<Process />
	<Faq />
	<Visit />
</main>

<Footer />
<MobileOrderBar />
