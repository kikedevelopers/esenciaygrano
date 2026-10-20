<script lang="ts">
	import { ArrowRight, Check, Plus } from '@lucide/svelte';
	import { families } from '$lib/catalog';
	import { parallax } from '$lib/actions/scroll';
	import { reveal } from '$lib/actions/reveal';
	import { order } from '$lib/order-state.svelte';
</script>

<!--
  La despensa: tres capítulos que se apilan al hacer scroll en escritorio (sticky stack).
  La foto de cada familia tiene su propio parallax dentro del marco.
-->
<section id="despensa" class="relative scroll-mt-20 px-3 pt-24 pb-10 sm:px-5 sm:pt-36">
	<div class="mx-auto max-w-6xl px-2 sm:px-4">
		<h2 use:reveal class="type-display max-w-3xl text-ivory">
			Tres familias. <span class="text-ivory-mute">Una sola obsesión por el sabor.</span>
		</h2>
	</div>

	<div class="mx-auto mt-14 max-w-6xl sm:mt-20">
		{#each families as family, i (family.id)}
			<article
				class="relative mb-5 overflow-hidden rounded-[2rem] bg-night-2 shadow-[0_0_0_1px_var(--night-line),0_-30px_60px_-30px_oklch(0.05_0.02_310/0.9)] sm:mb-10 lg:sticky lg:top-(--stack-top)"
				style="--stack-top: calc(5.5rem + {i} * 1.25rem);"
				aria-labelledby="family-{family.id}"
			>
				<!-- La foto sangra bajo el texto y se funde con la noche: nunca en caja -->
				<div
					class="fade-into-card pointer-events-none relative h-[40svh] overflow-hidden sm:h-[46svh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[66%]"
				>
					<img
						use:parallax={{ speed: -0.12 }}
						src={family.image.src}
						srcset={family.image.srcset}
						sizes="(min-width: 1024px) 66vw, 100vw"
						alt={family.image.alt}
						width="1000"
						height="536"
						loading="lazy"
						decoding="async"
						class="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover"
					/>
				</div>

				<div
					class="relative z-10 -mt-20 flex min-h-0 flex-col justify-end gap-6 p-7 sm:p-10 lg:mt-0 lg:min-h-[min(78svh,44rem)] lg:max-w-[46%] lg:p-14"
				>
					<div>
						<h3 id="family-{family.id}" class="type-title text-ivory">{family.name}</h3>
						<p class="type-lede mt-4 max-w-md text-ivory-dim">
							<span class="text-ivory">{family.headline}</span>
							{family.description}
						</p>
					</div>

					<ul class="flex flex-wrap gap-2" aria-label="Ejemplos de {family.name.toLowerCase()}">
						{#each family.items as item (item)}
							{@const selected = order.has(item)}
							<li>
								<button
									type="button"
									class="inline-flex h-10 items-center gap-1.5 rounded-full pr-4 pl-3 text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-200 ease-(--ease-out-strong) active:scale-[0.96] {selected
										? 'bg-magenta text-ivory shadow-[0_0_0_1px_var(--magenta)]'
										: 'bg-night-2/70 text-ivory shadow-[0_0_0_1px_var(--night-line)] backdrop-blur-sm hover:bg-night-3'}"
									aria-pressed={selected}
									onclick={() => order.toggle(item)}
								>
									{#if selected}<Check class="size-4" aria-hidden="true" />{:else}<Plus
											class="size-4 text-ivory-mute"
											aria-hidden="true"
										/>{/if}
									{item}
								</button>
							</li>
						{/each}
					</ul>

					<a
						href="#pedido"
						class="group inline-flex items-center gap-2 self-start text-sm font-medium text-gold"
					>
						Arma tu pedido
						<ArrowRight
							class="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
						/>
					</a>
				</div>
			</article>
		{/each}
	</div>
</section>
