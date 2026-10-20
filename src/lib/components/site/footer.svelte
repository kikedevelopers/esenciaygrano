<script lang="ts">
	import logo from '$lib/assets/logo-160.webp';
	import { address_line, opening_hours, phone_display, phone_href, whatsapp_url } from '$lib/site';

	const links = [
		{ label: 'La despensa', href: '#despensa' },
		{ label: 'Arma tu pedido', href: '#pedido' },
		{ label: 'Nuestra esencia', href: '#esencia' },
		{ label: 'Preguntas', href: '#preguntas' },
		{ label: 'Visítanos', href: '#visitanos' }
	];
	const year = new Date().getFullYear();
</script>

<footer class="relative overflow-hidden bg-night pt-16 pb-28 sm:pb-12">
	<div class="mx-auto max-w-6xl px-5">
		<div
			class="grid grid-cols-1 gap-10 border-t border-night-line pt-10 md:grid-cols-[1.4fr_1fr_1fr]"
		>
			<div class="flex items-start gap-4">
				<span class="grid size-14 shrink-0 place-items-center rounded-full bg-ivory p-0.5">
					<img src={logo} alt="" width="160" height="160" class="h-full w-full object-contain" />
				</span>
				<div>
					<p class="text-lg font-semibold tracking-[-0.02em] text-ivory">
						Esencia <span class="text-gold">&</span> Grano
					</p>
					<p class="mt-1 text-sm text-ivory-mute">La Despensa de la 21</p>
					<p class="mt-4 max-w-xs text-sm leading-relaxed text-ivory-dim">
						Condimentos, granos y frutos secos seleccionados a granel en Ibagué.
					</p>
				</div>
			</div>

			<nav aria-label="Pie de página">
				<p class="text-sm text-ivory-mute">Navegación</p>
				<ul class="mt-3 flex flex-col">
					{#each links as link (link.href)}
						<li>
							<a
								href={link.href}
								class="inline-block py-1.5 text-ivory-dim transition-colors duration-150 hover:text-ivory"
								>{link.label}</a
							>
						</li>
					{/each}
				</ul>
			</nav>

			<address class="not-italic">
				<p class="text-sm text-ivory-mute">Contacto</p>
				<ul class="mt-3 flex flex-col text-ivory-dim">
					<li class="py-1.5">{address_line}</li>
					<li>
						<a href={phone_href} class="inline-block py-1.5 transition-colors hover:text-ivory"
							>{phone_display}</a
						>
					</li>
					<li>
						<a
							href={whatsapp_url()}
							target="_blank"
							rel="noopener"
							class="inline-block py-1.5 transition-colors hover:text-ivory">WhatsApp</a
						>
					</li>
					<li class="py-1.5">{opening_hours}</li>
				</ul>
			</address>
		</div>

		<p
			class="mt-16 text-[clamp(2.4rem,10.6vw,9.75rem)] leading-[0.85] font-semibold tracking-[-0.04em] whitespace-nowrap text-ivory/[0.08] select-none"
			aria-hidden="true"
		>
			Esencia & Grano
		</p>

		<div
			class="mt-8 flex flex-col gap-2 text-sm text-ivory-mute sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© {year} Esencia & Grano · La Despensa de la 21.</p>
			<p>Imágenes de producto ilustrativas.</p>
		</div>
	</div>
</footer>
