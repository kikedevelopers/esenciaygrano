<script lang="ts">
	import { onMount } from 'svelte';
	import { order } from '$lib/order-state.svelte';
	import { build_order_url } from '$lib/order';
	import { default_whatsapp_message, whatsapp_url } from '$lib/site';
	import WhatsappIcon from './whatsapp-icon.svelte';

	// Barra inferior en móvil: WhatsApp al alcance del pulgar una vez pasado el hero.
	// Se retira mientras el armador de pedidos está en pantalla: allí el ticket ya tiene su botón
	// y la barra taparía el campo de producto.
	let past_hero = $state(false);
	let builder_in_view = $state(false);
	const visible = $derived(past_hero && !builder_in_view);

	const href = $derived(
		order.lines.length ? build_order_url(order.lines) : whatsapp_url(default_whatsapp_message)
	);

	onMount(() => {
		const on_scroll = () => {
			past_hero = window.scrollY > window.innerHeight * 0.9;
		};
		on_scroll();
		window.addEventListener('scroll', on_scroll, { passive: true });

		const builder = document.getElementById('pedido');
		const observer = builder
			? new IntersectionObserver(([entry]) => (builder_in_view = entry.isIntersecting), {
					rootMargin: '0px 0px -15% 0px'
				})
			: undefined;
		if (builder) observer?.observe(builder);

		return () => {
			window.removeEventListener('scroll', on_scroll);
			observer?.disconnect();
		};
	});
</script>

<div
	class="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-(--ease-out-strong) sm:hidden {visible
		? 'translate-y-0 opacity-100'
		: 'pointer-events-none translate-y-full opacity-0'}"
>
	<a
		{href}
		target="_blank"
		rel="noopener"
		tabindex={visible ? 0 : -1}
		class="pill-gold w-full shadow-[0_18px_40px_-12px_oklch(0.05_0.02_310/0.95)]"
	>
		<WhatsappIcon class="size-[1.15rem]" />
		{#if order.lines.length}
			Enviar pedido · {order.lines.length}
			{order.lines.length === 1 ? 'producto' : 'productos'}
		{:else}
			Pide por WhatsApp
		{/if}
	</a>
</div>
