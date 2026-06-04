<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { Quote } from '@lucide/svelte';
</script>

<section id="esencia" class="scroll-mt-24 bg-secondary/40 py-20 sm:py-28">
	<div class="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16">
		<!-- Composición visual -->
		<div use:reveal class="relative">
			<div
				class="surface-aubergine relative overflow-hidden rounded-[2rem] p-9 text-white shadow-xl sm:p-12"
			>
				<Quote class="size-10 text-gold" />
				<p class="mt-5 font-serif text-2xl leading-snug sm:text-3xl">
					“Creemos que un buen platillo empieza mucho antes de la cocina: empieza en el grano,
					en la especia y en quien la elige con cariño.”
				</p>
				<div class="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
					<div class="grid size-11 place-items-center rounded-full bg-white/10 font-serif text-lg">
						EG
					</div>
					<div>
						<p class="font-medium">Familia Esencia & Grano</p>
						<p class="text-sm text-white/60">La Despensa de la 21</p>
					</div>
				</div>
			</div>
			<div
				class="absolute -bottom-5 -left-5 -z-10 size-40 rounded-3xl bg-gold/25 blur-2xl"
				aria-hidden="true"
			></div>
		</div>

		<!-- Texto -->
		<div use:reveal={{ delay: 80 }}>
			<span class="text-sm font-semibold tracking-[0.2em] text-magenta uppercase">Nuestra esencia</span>
			<h2 class="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
				Una despensa de barrio con alma artesanal
			</h2>
			<p class="mt-5 text-lg leading-relaxed text-muted-foreground">
				Nacimos en la 21 con una idea sencilla: ofrecer condimentos, granos y frutos secos como
				los de antes, vendidos a granel, sin desperdicio y con la calidad que merece tu mesa.
			</p>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
				Seleccionamos cada lote a mano, cuidamos el origen y te acompañamos para que lleves a casa
				justo lo que necesitas, en su punto perfecto de frescura.
			</p>

			<div class="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
				{#each [['Origen', 'Trazable'], ['Venta', 'A granel'], ['Frescura', 'Garantizada']] as [k, v] (k)}
					<div class="bg-card px-5 py-5">
						<p class="text-xs tracking-wide text-muted-foreground uppercase">{k}</p>
						<p class="mt-1 font-serif text-xl font-semibold text-foreground">{v}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
