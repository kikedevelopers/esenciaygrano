<script lang="ts">
	import Navbar from '$lib/components/site/navbar.svelte';
	import Hero from '$lib/components/site/hero.svelte';
	import Categories from '$lib/components/site/categories.svelte';
	import About from '$lib/components/site/about.svelte';
	import Benefits from '$lib/components/site/benefits.svelte';
	import Faq from '$lib/components/site/faq.svelte';
	import Visit from '$lib/components/site/visit.svelte';
	import Footer from '$lib/components/site/footer.svelte';

	const siteUrl = 'https://esenciaygrano.com';
	const ogImage = `${siteUrl}/og-image.png`;
	const title = 'Esencia & Grano · Frutos secos y granos a granel en Ibagué';
	const description =
		'Tienda a granel en Ibagué, Plaza de la 21: condimentos, especias, granos, semillas y frutos secos frescos y seleccionados. Llévate solo lo que necesitas. Tel. 301 595 5518.';

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
				mainEntity: [
					{
						'@type': 'Question',
						name: '¿Puedo comprar la cantidad exacta que necesito?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Sí. Todo se vende a granel, así que puedes llevar desde unos gramos hasta varios kilos. Pagas solo por lo que usas.'
						}
					},
					{
						'@type': 'Question',
						name: '¿Cómo garantizan la frescura de los productos?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Trabajamos con rotación constante y compras frecuentes a nuestros proveedores. Los granos y frutos secos se almacenan en condiciones controladas para conservar aroma y propiedades.'
						}
					},
					{
						'@type': 'Question',
						name: '¿Tienen opciones para dietas especiales?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Contamos con cereales integrales, semillas, legumbres y frutos secos naturales, ideales para dietas veganas, sin gluten o altas en proteína. Pregúntanos y te orientamos.'
						}
					},
					{
						'@type': 'Question',
						name: '¿Hacen pedidos o entregas?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Puedes encargar tu pedido y pasar a recogerlo en La Despensa de la 21. Escríbenos para coordinar disponibilidad y cantidades.'
						}
					}
				]
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
	<meta name="theme-color" content="#2a1245" />

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
	<Categories />
	<About />
	<Benefits />
	<Faq />
	<Visit />
</main>

<Footer />
