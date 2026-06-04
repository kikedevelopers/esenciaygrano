<script lang="ts">
	import Navbar from '$lib/components/site/navbar.svelte';
	import Hero from '$lib/components/site/hero.svelte';
	import Categories from '$lib/components/site/categories.svelte';
	import About from '$lib/components/site/about.svelte';
	import Benefits from '$lib/components/site/benefits.svelte';
	import Faq from '$lib/components/site/faq.svelte';
	import Visit from '$lib/components/site/visit.svelte';
	import Footer from '$lib/components/site/footer.svelte';
</script>

<svelte:head>
	<title>Esencia & Grano · Condimentos, granos y frutos secos | La Despensa de la 21</title>
	<meta
		name="description"
		content="Esencia & Grano, la despensa de la 21. Condimentos, granos y frutos secos seleccionados a granel, con la frescura y el sabor auténtico de lo natural."
	/>
	<meta name="theme-color" content="#2a1245" />
	<meta property="og:title" content="Esencia & Grano · La Despensa de la 21" />
	<meta
		property="og:description"
		content="Condimentos, granos y frutos secos a granel, frescos y seleccionados a mano."
	/>
	<meta property="og:type" content="website" />
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
