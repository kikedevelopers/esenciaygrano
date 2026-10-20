<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { reveal } from '$lib/actions/reveal';
	import { faqs } from '$lib/faqs';
</script>

<section
	id="preguntas"
	class="relative scroll-mt-20 bg-night py-24 sm:py-32"
	aria-labelledby="faq-title"
>
	<div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
		<h2 id="faq-title" use:reveal class="type-display text-ivory lg:sticky lg:top-28 lg:self-start">
			Preguntas, <span class="text-ivory-mute">respuestas.</span>
		</h2>

		<div use:reveal={{ delay: 60 }}>
			<Accordion.Root type="single" class="w-full border-t border-night-line">
				{#each faqs as faq, i (faq.q)}
					<Accordion.Item value={`item-${i}`} class="border-b border-night-line">
						<Accordion.Trigger
							class="items-center py-6 text-left text-lg font-medium tracking-[-0.02em] text-ivory hover:no-underline sm:text-xl"
						>
							{faq.q}
						</Accordion.Trigger>
						<Accordion.Content class="max-w-2xl pb-6 text-base leading-relaxed text-ivory-dim">
							{faq.a}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	</div>
</section>
