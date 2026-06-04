<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Leaf, Wheat, Nut, ArrowUpRight } from '@lucide/svelte';

	const categories = [
		{
			icon: Leaf,
			name: 'Condimentos',
			desc: 'Especias y mezclas molidas al momento que despiertan cada platillo.',
			items: ['Pimentón ahumado', 'Comino', 'Curry', 'Orégano'],
			accent: 'text-magenta',
			ring: 'group-hover:ring-magenta/40'
		},
		{
			icon: Wheat,
			name: 'Granos',
			desc: 'Legumbres, cereales y semillas a granel, frescos y sin aditivos.',
			items: ['Lentejas', 'Garbanzos', 'Arroz integral', 'Quinua'],
			accent: 'text-violet',
			ring: 'group-hover:ring-violet/40'
		},
		{
			icon: Nut,
			name: 'Frutos secos',
			desc: 'Nueces, almendras y mixes energéticos tostados con cuidado.',
			items: ['Almendras', 'Nueces', 'Pistachos', 'Arándanos'],
			accent: 'text-gold',
			ring: 'group-hover:ring-gold/50'
		}
	];
</script>

<section id="categorias" class="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
	<div class="max-w-2xl" use:reveal>
		<span class="text-sm font-semibold tracking-[0.2em] text-magenta uppercase">El catálogo</span>
		<h2 class="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
			Tres familias, una misma <span class="text-gradient-brand">obsesión por el sabor</span>
		</h2>
		<p class="mt-4 text-lg text-muted-foreground">
			Cada producto pasa por nuestras manos antes de llegar a las tuyas. Compra justo lo que
			necesitas, a granel y siempre fresco.
		</p>
	</div>

	<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
		{#each categories as cat, i (cat.name)}
			{@const Icon = cat.icon}
			<article
				use:reveal={{ delay: i * 90 }}
				class="group relative flex flex-col rounded-3xl border border-border bg-card p-7 ring-1 ring-transparent transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 {cat.ring}"
			>
				<div class="flex items-center justify-between">
					<span class="grid size-13 place-items-center rounded-2xl bg-secondary {cat.accent}">
						<Icon class="size-6" />
					</span>
					<ArrowUpRight
						class="size-5 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
					/>
				</div>

				<h3 class="mt-6 text-2xl font-semibold">{cat.name}</h3>
				<p class="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{cat.desc}</p>

				<ul class="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
					{#each cat.items as item (item)}
						<li class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-secondary-foreground">
							{item}
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>
