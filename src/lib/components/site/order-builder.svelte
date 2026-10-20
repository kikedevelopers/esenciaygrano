<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { Check, Plus, X } from '@lucide/svelte';
	import { families } from '$lib/catalog';
	import { reveal } from '$lib/actions/reveal';
	import { order } from '$lib/order-state.svelte';
	import { build_order_url, format_grams, gram_options } from '$lib/order';
	import { default_whatsapp_message, whatsapp_url } from '$lib/site';
	import WhatsappIcon from './whatsapp-icon.svelte';

	let custom_product = $state('');

	const total_display = new Tween(0, { duration: 500, easing: cubicOut });
	$effect(() => {
		total_display.target = order.total;
	});

	const order_url = $derived(order.lines.length ? build_order_url(order.lines) : '');

	function add_custom(event: SubmitEvent) {
		event.preventDefault();
		const name = custom_product.trim();
		if (!name || order.has(name)) return;
		order.toggle(name);
		custom_product = '';
	}

	function grams_label(grams: number) {
		return grams === 1000 ? '1 kg' : `${grams}`;
	}
</script>

<section id="pedido" class="chapter-paper relative scroll-mt-20 py-24 sm:py-32">
	<div class="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-[1fr_25rem] lg:gap-16">
		<div>
			<h2 use:reveal class="type-display text-ink">
				Arma tu pedido. <span class="text-ink-dim">Llega listo a WhatsApp.</span>
			</h2>
			<p use:reveal={{ delay: 60 }} class="type-lede mt-6 max-w-xl text-ink-dim">
				Elige productos y cantidades. Te confirmamos disponibilidad y coordinamos si es a domicilio
				o para recoger en la 21.
			</p>

			<div class="mt-12 flex flex-col gap-9">
				{#each families as family (family.id)}
					<fieldset use:reveal>
						<legend class="type-label text-ink">{family.name}</legend>
						<div class="mt-3 flex flex-wrap gap-2">
							{#each family.items as item (item)}
								{@const selected = order.has(item)}
								<button
									type="button"
									class="inline-flex h-11 items-center gap-1.5 rounded-full pr-4 pl-3 text-[0.95rem] font-medium transition-[background-color,color,box-shadow,transform] duration-200 ease-(--ease-out-strong) active:scale-[0.96] {selected
										? 'bg-magenta text-white shadow-[0_0_0_1px_var(--magenta)]'
										: 'bg-white text-ink shadow-[0_0_0_1px_oklch(0.21_0.055_312/0.12)] hover:shadow-[0_0_0_1px_oklch(0.21_0.055_312/0.35)]'}"
									aria-pressed={selected}
									onclick={() => order.toggle(item)}
								>
									{#if selected}
										<Check class="size-4" aria-hidden="true" />
									{:else}
										<Plus class="size-4 text-ink-dim" aria-hidden="true" />
									{/if}
									{item}
								</button>
							{/each}
						</div>
					</fieldset>
				{/each}

				<form use:reveal class="flex max-w-md flex-col gap-3" onsubmit={add_custom}>
					<label for="custom-product" class="type-label text-ink">¿Buscas otro producto?</label>
					<div class="flex gap-2">
						<input
							id="custom-product"
							bind:value={custom_product}
							maxlength="60"
							autocomplete="off"
							placeholder="Ej.: chía, maní…"
							class="h-12 min-w-0 flex-1 rounded-full bg-white px-5 text-base text-ink shadow-[0_0_0_1px_oklch(0.21_0.055_312/0.15)] transition-shadow outline-none placeholder:text-ink-dim focus:shadow-[0_0_0_2px_var(--ink)]"
						/>
						<button
							type="submit"
							disabled={!custom_product.trim()}
							class="h-12 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-[opacity,transform] duration-150 active:scale-[0.97] disabled:opacity-35"
						>
							Añadir
						</button>
					</div>
				</form>
			</div>
		</div>

		<!-- El ticket -->
		<aside class="lg:sticky lg:top-24 lg:self-start" aria-labelledby="ticket-title">
			<div
				use:reveal={{ delay: 80 }}
				class="rounded-[1.75rem] bg-white p-6 text-ink shadow-[0_1px_2px_oklch(0.21_0.055_312/0.06),0_24px_60px_-28px_oklch(0.21_0.055_312/0.35)] sm:p-7"
			>
				<div class="flex items-baseline justify-between">
					<h3 id="ticket-title" class="text-xl font-semibold tracking-[-0.025em]">Tu pedido</h3>
					<p class="text-sm text-ink-dim tabular-nums" aria-live="polite">
						{order.lines.length}
						{order.lines.length === 1 ? 'producto' : 'productos'}
					</p>
				</div>

				{#if order.lines.length === 0}
					<p
						class="mt-6 rounded-2xl bg-paper-2/60 px-5 py-8 text-center text-[0.95rem] text-ink-dim"
					>
						Toca un producto para empezar tu lista.
					</p>
				{:else}
					<ul class="mt-5 flex flex-col divide-y divide-ink/8">
						{#each order.lines as line (line.product)}
							{@const active_index = gram_options.indexOf(line.grams)}
							<li
								class="py-4"
								animate:flip={{ duration: 300, easing: cubicOut }}
								in:fly={{ y: 12, duration: 320, easing: cubicOut }}
								out:fade={{ duration: 150 }}
							>
								<div class="flex items-center justify-between gap-3">
									<p class="truncate font-medium">{line.product}</p>
									<button
										type="button"
										class="-mr-2 grid size-9 shrink-0 place-items-center rounded-full text-ink-dim transition-colors hover:bg-paper-2 hover:text-ink"
										aria-label="Quitar {line.product}"
										onclick={() => order.toggle(line.product)}
									>
										<X class="size-4" />
									</button>
								</div>
								<div
									role="group"
									aria-label="Cantidad de {line.product}"
									class="relative mt-2.5 grid grid-cols-4 rounded-full bg-paper-2 p-1"
								>
									<span
										class="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/4)] rounded-full bg-white shadow-[0_1px_3px_oklch(0.21_0.055_312/0.18)] transition-transform duration-300 ease-(--ease-out-strong)"
										style="transform: translateX({active_index * 100}%);"
										aria-hidden="true"
									></span>
									{#each gram_options as grams (grams)}
										<button
											type="button"
											class="relative z-10 h-9 rounded-full text-sm font-medium tabular-nums transition-colors {line.grams ===
											grams
												? 'text-ink'
												: 'text-ink-dim hover:text-ink'}"
											aria-pressed={line.grams === grams}
											aria-label={format_grams(grams)}
											onclick={() => order.set_grams(line.product, grams)}
										>
											{grams_label(grams)}
										</button>
									{/each}
								</div>
							</li>
						{/each}
					</ul>
				{/if}

				<div class="mt-5 flex items-baseline justify-between border-t border-ink/10 pt-5">
					<p class="text-sm text-ink-dim">Total aproximado</p>
					<p class="text-2xl font-semibold tracking-[-0.03em] tabular-nums">
						{format_grams(Math.round(total_display.current / 10) * 10)}
					</p>
				</div>

				{#if order.lines.length}
					<a href={order_url} target="_blank" rel="noopener" class="pill-gold mt-5 w-full">
						<WhatsappIcon class="size-[1.15rem]" />
						Enviar por WhatsApp
					</a>
					<button
						type="button"
						class="mt-2 w-full rounded-full py-2.5 text-sm text-ink-dim transition-colors hover:text-ink"
						onclick={() => order.clear()}
					>
						Vaciar lista
					</button>
				{:else}
					<a
						href={whatsapp_url(default_whatsapp_message)}
						target="_blank"
						rel="noopener"
						class="mt-5 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full font-semibold text-ink shadow-[0_0_0_1px_oklch(0.21_0.055_312/0.2)] transition-transform duration-150 active:scale-[0.97]"
					>
						<WhatsappIcon class="size-[1.15rem]" />
						O escríbenos sin lista
					</a>
				{/if}
			</div>
		</aside>
	</div>
</section>
