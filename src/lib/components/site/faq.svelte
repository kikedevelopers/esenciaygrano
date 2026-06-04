<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { reveal } from '$lib/actions/reveal';

	const faqs = [
		{
			q: '¿Puedo comprar la cantidad exacta que necesito?',
			a: 'Sí. Todo se vende a granel, así que puedes llevar desde unos gramos hasta varios kilos. Pagas solo por lo que usas.'
		},
		{
			q: '¿Cómo garantizan la frescura de los productos?',
			a: 'Trabajamos con rotación constante y compras frecuentes a nuestros proveedores. Los granos y frutos secos se almacenan en condiciones controladas para conservar aroma y propiedades.'
		},
		{
			q: '¿Tienen opciones para dietas especiales?',
			a: 'Contamos con cereales integrales, semillas, legumbres y frutos secos naturales, ideales para dietas veganas, sin gluten o altas en proteína. Pregúntanos y te orientamos.'
		},
		{
			q: '¿Hacen pedidos o entregas?',
			a: 'Puedes encargar tu pedido y pasar a recogerlo en La Despensa de la 21. Escríbenos para coordinar disponibilidad y cantidades.'
		}
	];
</script>

<section id="preguntas" class="mx-auto max-w-3xl scroll-mt-24 px-5 py-20 sm:py-28">
	<div class="text-center" use:reveal>
		<span class="text-sm font-semibold tracking-[0.2em] text-magenta uppercase">Preguntas frecuentes</span>
		<h2 class="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Resolvemos tus dudas</h2>
	</div>

	<div use:reveal={{ delay: 80 }} class="mt-10 rounded-2xl border border-border bg-card px-6">
		<Accordion.Root type="single" class="w-full">
			{#each faqs as faq, i (faq.q)}
				<Accordion.Item value={`item-${i}`}>
					<Accordion.Trigger class="py-5 text-base font-medium hover:no-underline">
						{faq.q}
					</Accordion.Trigger>
					<Accordion.Content class="text-[0.95rem] leading-relaxed text-muted-foreground">
						{faq.a}
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</div>
</section>
