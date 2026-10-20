<script lang="ts">
	import { ArrowUpRight, Clock, MapPin, Phone, Wallet } from '@lucide/svelte';
	import { reveal } from '$lib/actions/reveal';
	import {
		address_line,
		default_whatsapp_message,
		maps_url,
		opening_hours,
		payment_methods,
		phone_display,
		phone_href,
		whatsapp_url
	} from '$lib/site';
	import WhatsappIcon from './whatsapp-icon.svelte';

	const info = [
		{ icon: MapPin, label: 'Dónde estamos', value: address_line, href: maps_url, external: true },
		{ icon: Clock, label: 'Horario', value: opening_hours },
		{ icon: Phone, label: 'Teléfono', value: phone_display, href: phone_href },
		{ icon: Wallet, label: 'Pagos', value: payment_methods }
	];
</script>

<section id="visitanos" class="key-light relative scroll-mt-16 overflow-hidden py-24 sm:py-36">
	<div class="mx-auto max-w-6xl px-5">
		<h2 use:reveal class="type-mega max-w-5xl text-ivory">
			Te esperamos <span class="text-gold">en la 21.</span>
		</h2>
		<p use:reveal={{ delay: 60 }} class="type-lede mt-7 max-w-xl text-ivory-dim">
			Ven a oler, probar y elegir. O escríbenos y te lo llevamos.
		</p>
		<div use:reveal={{ delay: 120 }} class="mt-10 flex flex-wrap gap-3">
			<a
				href={whatsapp_url(default_whatsapp_message)}
				target="_blank"
				rel="noopener"
				class="pill-gold"
			>
				<WhatsappIcon class="size-[1.15rem]" />
				Pide por WhatsApp
			</a>
			<a href={maps_url} target="_blank" rel="noopener" class="pill-ghost">
				Cómo llegar
				<ArrowUpRight class="size-4" aria-hidden="true" />
			</a>
		</div>

		<ul class="mt-20 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
			{#each info as item, i (item.label)}
				{@const Icon = item.icon}
				<li use:reveal={{ delay: i * 60 }} class="border-t border-night-line">
					<svelte:element
						this={item.href ? 'a' : 'div'}
						href={item.href}
						target={item.external ? '_blank' : undefined}
						rel={item.external ? 'noopener' : undefined}
						class="group flex gap-4 py-6 {item.href ? 'transition-colors' : ''}"
					>
						<Icon class="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
						<span>
							<span class="block text-sm text-ivory-mute">{item.label}</span>
							<span
								class="mt-1 block font-medium text-ivory {item.href
									? 'underline decoration-transparent decoration-1 transition-[text-decoration-color] group-hover:decoration-gold'
									: ''}">{item.value}</span
							>
						</span>
					</svelte:element>
				</li>
			{/each}
		</ul>
	</div>
</section>
