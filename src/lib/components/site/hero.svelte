<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, MapPin, Sparkles } from '@lucide/svelte';
</script>

<section id="inicio" class="surface-aubergine relative overflow-hidden text-white">
	<!-- Halos decorativos -->
	<div
		class="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-violet/30 blur-[120px]"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -top-16 right-0 size-[28rem] rounded-full bg-magenta/30 blur-[130px]"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute top-1/4 right-1/4 size-72 rounded-full bg-violet/30 blur-[120px]"
		aria-hidden="true"
	></div>

	<div class="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pt-32 pb-20 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
		<!-- Columna de texto -->
		<div class="flex min-w-0 flex-col">
			<span
				class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/85 backdrop-blur-sm"
			>
				<Sparkles class="size-3.5 text-gold" />
				Condimentos, granos y frutos secos
			</span>

			<h1
				class="mt-6 max-w-xl text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl sm:leading-[1.04] lg:text-7xl"
			>
				El sabor que nace
				<span class="text-gradient-brand">de la esencia</span>
				y del grano.
			</h1>

			<p class="mt-6 max-w-md text-lg leading-relaxed text-white/70">
				La despensa de la 21: especias, semillas y frutos secos seleccionados a granel,
				con la frescura y el aroma de lo auténtico.
			</p>

			<div class="mt-9 flex flex-wrap items-center gap-3">
				<Button
					href="#categorias"
					size="lg"
					class="group h-12 rounded-full bg-gold px-6 text-base text-gold-foreground shadow-lg shadow-black/20 hover:bg-gold/90"
				>
					Explorar catálogo
					<ArrowRight class="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
				</Button>
				<Button
					href="#visitanos"
					variant="outline"
					size="lg"
					class="h-12 rounded-full border-white/20 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white"
				>
					<MapPin class="size-4 text-gold" />
					Cómo llegar
				</Button>
			</div>

			<dl class="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
				<div>
					<dt class="font-serif text-3xl font-semibold text-white">+120</dt>
					<dd class="mt-1 text-xs tracking-wide text-white/60 uppercase">Productos a granel</dd>
				</div>
				<div>
					<dt class="font-serif text-3xl font-semibold text-white">100%</dt>
					<dd class="mt-1 text-xs tracking-wide text-white/60 uppercase">Selección natural</dd>
				</div>
				<div>
					<dt class="font-serif text-3xl font-semibold text-white">21</dt>
					<dd class="mt-1 text-xs tracking-wide text-white/60 uppercase">Tu despensa de barrio</dd>
				</div>
			</dl>
		</div>

		<!-- Columna del logotipo -->
		<div class="relative mx-auto flex w-full max-w-md min-w-0 items-center justify-center">
			<div
				class="absolute inset-0 scale-110 rounded-full bg-gradient-to-tr from-violet/45 via-magenta/35 to-gold/35 blur-3xl"
				aria-hidden="true"
			></div>
			<div
				class="relative grid aspect-square w-full place-items-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_50%_35%,#ffffff_0%,#faf6ff_70%,#f3ecff_100%)] p-7 shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:p-10"
			>
				<img
					src="/logo.png"
					alt="Logotipo de Esencia & Grano"
					class="h-full w-full object-contain drop-shadow-sm"
				/>
			</div>
		</div>
	</div>

	<!-- Onda inferior hacia el fondo claro -->
	<div class="h-16 bg-gradient-to-b from-transparent to-background sm:h-24"></div>
</section>
