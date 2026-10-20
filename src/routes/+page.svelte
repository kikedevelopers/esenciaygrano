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
	import { faqs } from '$lib/faqs';

	const siteUrl = 'https://esenciaygrano.com';
	const ogImage = `${siteUrl}/og-image.png`;
	const title = 'Esencia & Grano · Frutos secos y granos a granel en Ibagué';
	const description =
		'Tienda a granel en Ibagué, Plaza de la 21: condimentos, especias, granos, semillas y frutos secos frescos y seleccionados. Pide por WhatsApp a domicilio o recoge en tienda. Tel. 301 595 5518.';

	// Datos estructurados (JSON-LD) para SEO local y resultados enriquecidos.
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'GroceryStore',
				'@id': `${siteUrl}/#tienda`,
				name: 'Esencia & Grano',
				alternateName: 'La Despensa de la 21',
				description,
				url: siteUrl,
				image: ogImage,
				logo: ogImage,
				telephone: '+573015955518',
				priceRange: '$$',
				currenciesAccepted: 'COP',
				paymentAccepted: 'Efectivo, Transferencia, Nequi',
				address: {
					'@type': 'PostalAddress',
					streetAddress: 'Plaza de la 21',
					addressLocality: 'Ibagué',
					addressRegion: 'Tolima',
					addressCountry: 'CO'
				},
				areaServed: { '@type': 'City', name: 'Ibagué' },
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
					telephone: '+573015955518',
					contactType: 'customer service',
					availableLanguage: 'Spanish'
				}
			},
			{
				'@type': 'FAQPage',
				'@id': `${siteUrl}/#preguntas`,
				mainEntity: faqs.map((faq) => ({
					'@type': 'Question',
					name: faq.q,
					acceptedAnswer: { '@type': 'Answer', text: faq.a }
				}))
			}
		]
	};

	const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={siteUrl} />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
	<meta name="author" content="Esencia & Grano" />
	<meta
		name="keywords"
		content="frutos secos Ibagué, granos a granel, condimentos, especias, semillas, productos a granel Ibagué, despensa de la 21, almendras, nueces, legumbres"
	/>
	<meta name="theme-color" content="#0d0612" />

	<!-- Geolocalización para SEO local -->
	<meta name="geo.region" content="CO-TOL" />
	<meta name="geo.placename" content="Ibagué, Tolima" />

	<!-- Open Graph -->
	<meta property="og:site_name" content="Esencia & Grano" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:locale" content="es_CO" />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Esencia & Grano · La Despensa de la 21" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	{@html jsonLdScript}
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
