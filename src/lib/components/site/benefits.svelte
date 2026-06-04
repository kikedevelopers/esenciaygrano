<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Scale, Sprout, BadgeCheck, HeartHandshake } from '@lucide/svelte';

	const benefits = [
		{ icon: Scale, title: 'Compra a granel', desc: 'Lleva la cantidad exacta. Menos desperdicio, más ahorro.' },
		{ icon: Sprout, title: 'Frescura real', desc: 'Rotación constante para conservar aroma y propiedades.' },
		{ icon: BadgeCheck, title: 'Calidad seleccionada', desc: 'Revisamos cada lote para que solo llegue lo mejor.' },
		{ icon: HeartHandshake, title: 'Trato cercano', desc: 'Te asesoramos como la despensa de confianza del barrio.' }
	];
</script>

<section id="beneficios" class="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
	<div class="mx-auto max-w-2xl text-center" use:reveal>
		<span class="text-sm font-semibold tracking-[0.2em] text-magenta uppercase">Por qué elegirnos</span>
		<h2 class="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
			Lo bueno, sin intermediarios
		</h2>
	</div>

	<div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each benefits as b, i (b.title)}
			{@const Icon = b.icon}
			<div
				use:reveal={{ delay: i * 70 }}
				class="group rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/30"
			>
				<span
					class="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-violet/15 to-magenta/15 text-primary transition-transform duration-200 group-hover:scale-105"
				>
					<Icon class="size-5.5" />
				</span>
				<h3 class="mt-5 text-lg font-semibold">{b.title}</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
			</div>
		{/each}
	</div>
</section>
