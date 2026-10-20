<script lang="ts">
	import granel_1000 from '$lib/assets/img/granel-1000.webp';
	import granel_640 from '$lib/assets/img/granel-640.webp';
	import { parallax, scroll_progress } from '$lib/actions/scroll';
	import { reveal } from '$lib/actions/reveal';
	import { business_definition } from '$lib/site';
</script>

<!-- La foto se abre de un marco redondeado a pantalla completa mientras se recorre -->
<section
	id="esencia"
	class="relative scroll-mt-16 bg-night py-24 sm:py-32"
	use:scroll_progress
	aria-labelledby="essence-title"
>
	<div class="mx-auto max-w-6xl px-5">
		<h2 id="essence-title" use:reveal class="type-display max-w-4xl text-ivory">
			Seleccionamos cada lote <span class="text-ivory-mute">antes de que llegue a tus manos.</span>
		</h2>
		<!-- Definición autónoma: el párrafo que citan los buscadores con IA -->
		<p use:reveal={{ delay: 60 }} class="type-lede mt-7 max-w-3xl text-ivory-dim">
			{business_definition}
		</p>
	</div>

	<div
		class="relative mt-14 h-[62svh] overflow-hidden sm:mt-20 sm:h-[78svh]"
		style="--open: clamp(0, calc((var(--progress, 1) - 0.22) * 4), 1); --inset: calc((100vw - min(72rem, 100vw - 2.5rem)) / 2 * (1 - var(--open))); clip-path: inset(0 var(--inset) round calc(2rem * (1 - var(--open))));"
	>
		<!-- La foto se funde con la noche arriba y abajo: el marco nunca termina en un borde duro -->
		<div class="fade-vertical absolute inset-0">
			<img
				use:parallax={{ speed: -0.18 }}
				src={granel_1000}
				srcset="{granel_640} 640w, {granel_1000} 1000w"
				sizes="100vw"
				alt="Manos sirviendo grano con un cucharón de bronce dentro de una bolsa de papel kraft"
				width="1000"
				height="540"
				loading="lazy"
				decoding="async"
				class="absolute inset-x-0 -top-[15%] h-[130%] w-full object-cover"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent"
				aria-hidden="true"
			></div>
		</div>
		<figure class="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-8 sm:px-10 sm:pb-12">
			<blockquote
				class="max-w-2xl text-[clamp(1.4rem,2.6vw,2.25rem)] leading-[1.25] font-medium tracking-[-0.03em] text-pretty text-ivory sm:leading-[1.15]"
			>
				“Un buen plato empieza mucho antes de la cocina: en el grano, en la especia y en quien la
				elige con cariño.”
			</blockquote>
			<figcaption class="mt-4 text-sm text-ivory-dim">Familia Esencia & Grano</figcaption>
		</figure>
	</div>

	<div class="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-10 px-5 sm:mt-24 md:grid-cols-3">
		{#each [{ term: 'Origen cuidado', detail: 'Compras frecuentes a proveedores de confianza y lotes revisados a mano.' }, { term: 'Siempre a granel', detail: 'Desde unos gramos hasta varios kilos, sin empaques de más.' }, { term: 'Frescura real', detail: 'Rotación constante y almacenamiento que conserva aroma y propiedades.' }] as point, i (point.term)}
			<div use:reveal={{ delay: i * 80 }} class="border-t border-night-line pt-6">
				<h3 class="text-xl font-semibold tracking-[-0.025em] text-ivory">{point.term}</h3>
				<p class="mt-2 leading-relaxed text-ivory-dim">{point.detail}</p>
			</div>
		{/each}
	</div>
</section>
