<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { MapPin, Clock, Phone, ArrowRight } from '@lucide/svelte';

	const phone = '3015955518';
	const whatsappUrl = `https://wa.me/57${phone}?text=${encodeURIComponent('Hola, quiero hacer un pedido en Esencia & Grano 🌿')}`;

	const info = [
		{
			icon: MapPin,
			label: 'Dónde estamos',
			value: 'Plaza de la 21, Ibagué – Tolima',
			href: 'https://www.google.com/maps/search/?api=1&query=Plaza+de+la+21+Ibagu%C3%A9+Tolima'
		},
		{ icon: Clock, label: 'Horario', value: 'Lun a Sáb · 8:00 – 20:00' },
		{ icon: Phone, label: 'Contacto', value: '301 595 5518', href: `tel:+57${phone}` }
	];
</script>

<section id="visitanos" class="mx-auto max-w-6xl scroll-mt-24 px-5 pb-24">
	<div
		use:reveal
		class="surface-aubergine relative overflow-hidden rounded-[2.5rem] px-7 py-14 text-white sm:px-14 sm:py-18"
	>
		<div
			class="pointer-events-none absolute -top-20 right-10 size-72 rounded-full bg-gold/20 blur-[100px]"
			aria-hidden="true"
		></div>

		<div class="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
			<div>
				<h2 class="max-w-md text-4xl font-semibold tracking-tight sm:text-5xl">
					Te esperamos en <span class="text-gradient-brand">la 21</span>
				</h2>
				<p class="mt-5 max-w-md text-lg text-white/70">
					Ven a oler, probar y elegir. Llévate la esencia y el grano que tu cocina merece,
					con la atención de siempre.
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<Button
						href={whatsappUrl}
						target="_blank"
						rel="noopener"
						size="lg"
						class="group h-12 rounded-full bg-gold px-6 text-base text-gold-foreground hover:bg-gold/90"
					>
						Hacer un pedido
						<ArrowRight class="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
					</Button>
				</div>
			</div>

			<div class="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
				{#each info as item (item.label)}
					{@const Icon = item.icon}
					<svelte:element
						this={item.href ? 'a' : 'div'}
						href={item.href}
						target={item.href?.startsWith('http') ? '_blank' : undefined}
						rel={item.href?.startsWith('http') ? 'noopener' : undefined}
						class="flex items-center gap-4 bg-white/[0.03] px-6 py-5 backdrop-blur-sm transition-colors hover:bg-white/[0.07]"
					>
						<span class="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-gold">
							<Icon class="size-5" />
						</span>
						<div>
							<p class="text-xs tracking-wide text-white/55 uppercase">{item.label}</p>
							<p class="mt-0.5 font-medium">{item.value}</p>
						</div>
					</svelte:element>
				{/each}
			</div>
		</div>
	</div>
</section>
