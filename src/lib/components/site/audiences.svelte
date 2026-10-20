<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	const audiences = [
		{
			name: 'Para tu casa',
			text: 'Lleva 100 gramos para probar o el kilo de la semana. Pagas solo lo que usas.'
		},
		{
			name: 'Para tu dieta',
			text: 'Semillas, integrales, legumbres y frutos secos naturales para cocina vegana, sin gluten o alta en proteína. Te orientamos.'
		},
		{
			name: 'Para tu negocio',
			text: 'Restaurantes, panaderías y emprendedores: cantidades por volumen, coordinadas por WhatsApp.'
		}
	];
</script>

<section class="chapter-paper relative pt-24 sm:pt-32" aria-labelledby="audiences-title">
	<div class="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
		<h2 id="audiences-title" use:reveal class="type-display text-ink">
			Una despensa, <span class="text-ink-dim">tres cocinas.</span>
		</h2>
		<ul class="flex flex-col">
			{#each audiences as audience, i (audience.name)}
				<li use:reveal={{ delay: i * 70 }} class="border-t border-ink/12 py-7 first:pt-7">
					<h3 class="text-2xl font-semibold tracking-[-0.03em] text-ink">{audience.name}</h3>
					<p class="mt-2 max-w-lg text-lg leading-relaxed text-ink-dim">{audience.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
