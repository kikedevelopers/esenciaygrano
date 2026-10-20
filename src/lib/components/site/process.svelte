<script lang="ts">
	import { scroll_progress } from '$lib/actions/scroll';
	import { reveal } from '$lib/actions/reveal';

	const steps = [
		{ title: 'Escríbenos', text: 'Manda tu lista por WhatsApp o ármala aquí arriba en segundos.' },
		{ title: 'Lo pesamos', text: 'Servimos cada producto en la cantidad exacta que pediste.' },
		{
			title: 'Te llega o lo recoges',
			text: 'Coordinamos el domicilio o lo dejamos listo en la Plaza de la 21.'
		}
	];
</script>

<!-- La línea oliva se dibuja con el scroll y enciende cada paso al alcanzarlo -->
<section
	class="chapter-paper relative py-24 sm:py-32"
	use:scroll_progress
	aria-labelledby="process-title"
>
	<div class="mx-auto max-w-6xl px-5">
		<h2 id="process-title" use:reveal class="type-display max-w-3xl text-ink">Así de simple.</h2>

		<ol class="relative mt-14 grid grid-cols-1 gap-10 sm:mt-20 md:grid-cols-3 md:gap-8">
			<span
				class="absolute top-[0.6rem] left-0 hidden h-px w-full bg-ink/12 md:block"
				aria-hidden="true"
			></span>
			<span
				class="absolute top-[0.6rem] left-0 hidden h-px w-full origin-left bg-olive md:block"
				style="transform: scaleX(clamp(0, calc((var(--progress, 1) - 0.3) * 3), 1));"
				aria-hidden="true"
			></span>
			{#each steps as step, i (step.title)}
				<li class="relative" use:reveal={{ delay: i * 90 }}>
					<span
						class="relative z-10 grid size-5 place-items-center rounded-full bg-paper shadow-[0_0_0_1.5px_var(--olive)]"
						aria-hidden="true"
					>
						<span class="size-2 rounded-full bg-olive"></span>
					</span>
					<h3 class="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">{step.title}</h3>
					<p class="mt-2 max-w-xs leading-relaxed text-ink-dim">{step.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>
