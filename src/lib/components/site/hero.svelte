<script lang="ts">
	import { ArrowDown } from '@lucide/svelte';
	import hero_2048 from '$lib/assets/img/hero-2048.webp';
	import hero_1280 from '$lib/assets/img/hero-1280.webp';
	import hero_828 from '$lib/assets/img/hero-828.webp';
	import { scroll_progress } from '$lib/actions/scroll';
	import { default_whatsapp_message, whatsapp_url } from '$lib/site';
	import SpiceDust from './spice-dust.svelte';
	import WhatsappIcon from './whatsapp-icon.svelte';

	const facts = [
		{ value: '+120', label: 'productos a granel' },
		{ value: 'Lun – Sáb', label: '8:00 a 20:00' },
		{ value: 'Domicilios', label: 'o recoges en la 21' }
	];
</script>

<!--
  Hero en capítulo sticky: al hacer scroll el titular se aleja y se desvanece
  mientras el bodegón asciende y se acerca (tres profundidades de parallax).
-->
<section id="inicio" class="relative h-[170svh]" use:scroll_progress={{ mode: 'sticky' }}>
	<div class="sticky top-0 h-svh overflow-hidden bg-night">
		<!-- Profundidad 1: la luz cálida -->
		<div
			class="absolute inset-0"
			style="background: radial-gradient(55% 45% at 22% 18%, oklch(0.79 0.135 76 / 0.14), transparent 70%), radial-gradient(60% 55% at 85% 30%, oklch(0.52 0.2 302 / 0.18), transparent 70%);"
			aria-hidden="true"
		></div>

		<!-- Profundidad 2: el bodegón -->
		<div
			class="absolute inset-x-0 bottom-0 h-[58%] sm:h-[56%] lg:h-[54%]"
			style="transform: translate3d(0, calc(var(--progress, 0) * -9%), 0) scale(calc(1 + var(--progress, 0) * 0.12));"
		>
			<div class="hero-in-image h-full w-full">
				<img
					src={hero_1280}
					srcset="{hero_828} 828w, {hero_1280} 1280w, {hero_2048} 2048w"
					sizes="100vw"
					alt="Bodegón de almendras, marañones, pistachos, nueces, arándanos, canela, anís estrellado, pimienta y quinua"
					width="2048"
					height="1152"
					fetchpriority="high"
					class="dissolve-top h-full w-full object-cover object-[50%_80%]"
				/>
			</div>
			<div
				class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night via-night/60 to-transparent"
				aria-hidden="true"
			></div>
		</div>

		<!-- Velo de lectura: oscurece solo donde vive el texto -->
		<div
			class="absolute inset-0"
			style="background: radial-gradient(42% 34% at 50% 40%, oklch(0.14 0.035 315 / 0.72), transparent 100%);"
			aria-hidden="true"
		></div>

		<!-- Profundidad 3: el polvo de especias -->
		<SpiceDust class="absolute inset-0 h-full w-full" />

		<!-- Plano de lectura -->
		<div
			class="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center px-5 pt-[clamp(6rem,14svh,9rem)] text-center"
			style="opacity: calc(1 - var(--progress, 0) * 2.2); transform: translate3d(0, calc(var(--progress, 0) * -14svh), 0) scale(calc(1 - var(--progress, 0) * 0.08));"
		>
			<h1
				class="text-[clamp(3.75rem,8.4vw,8.75rem)] leading-[0.9] font-[620] tracking-[-0.04em] text-ivory"
			>
				<span class="hero-in block" style="--step: 0">Lo justo.</span>
				<span class="hero-in block text-gold" style="--step: 1">A granel.</span>
			</h1>
			<p class="hero-in type-lede mt-5 max-w-[34rem] text-ivory-dim sm:mt-6" style="--step: 2">
				Especias, granos, semillas y frutos secos pesados a tu medida, desde 100 gramos hasta el
				kilo. En la Plaza de la 21, Ibagué.
			</p>
			<div class="hero-in mt-7 flex flex-wrap items-center justify-center gap-3" style="--step: 3">
				<a
					href={whatsapp_url(default_whatsapp_message)}
					target="_blank"
					rel="noopener"
					class="pill-gold"
				>
					<WhatsappIcon class="size-[1.15rem]" />
					Pide por WhatsApp
				</a>
				<a href="#despensa" class="pill-ghost">Recorre la despensa</a>
			</div>
		</div>

		<!-- Datos -->
		<div
			class="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 sm:pb-8"
			style="opacity: calc(1 - var(--progress, 0) * 3);"
		>
			<dl
				class="hero-in mx-auto grid max-w-3xl grid-cols-3 gap-4 border-t border-night-line pt-5"
				style="--step: 4"
			>
				{#each facts as fact (fact.value)}
					<div class="flex flex-col-reverse items-center text-center">
						<dt class="mt-1 text-xs text-ivory-mute sm:text-sm">{fact.label}</dt>
						<dd class="text-base font-semibold tracking-[-0.02em] text-ivory sm:text-xl">
							{fact.value}
						</dd>
					</div>
				{/each}
			</dl>
		</div>

		<a
			href="#manifiesto"
			class="absolute bottom-28 left-1/2 z-10 hidden -translate-x-1/2 text-ivory-mute sm:block"
			style="opacity: calc(1 - var(--progress, 0) * 4);"
			aria-label="Seguir bajando"
		>
			<ArrowDown class="nudge size-4" aria-hidden="true" />
		</a>
	</div>
</section>
