<script lang="ts">
	import { scroll_progress } from '$lib/actions/scroll';

	const text =
		'Más de 120 productos que eliges, pesamos frente a ti y te llevas en la cantidad exacta. Sin empaques de más, sin desperdicio, con la frescura de una rotación constante.';
	const words = text.split(' ');
	// Palabras que reciben la luz dorada al encenderse
	const golden = new Set(['exacta.', 'frescura']);
</script>

<!-- Capítulo sticky: las palabras se encienden una a una con el scroll (Apple) -->
<section id="manifiesto" class="relative h-[200svh]" use:scroll_progress={{ mode: 'sticky' }}>
	<div class="key-light sticky top-0 flex h-svh items-center">
		<p
			class="word-light mx-auto max-w-5xl px-5 text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-ivory"
			style="--words: {words.length}"
		>
			{#each words as word, i (i)}
				<span style="--i: {i}" class={golden.has(word) ? 'text-gold' : ''}>{word}</span>{' '}
			{/each}
		</p>
	</div>
</section>
