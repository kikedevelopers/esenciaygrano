<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Menu, X } from '@lucide/svelte';
	import logo from '$lib/assets/logo-160.webp';
	import WhatsappIcon from './whatsapp-icon.svelte';
	import { default_whatsapp_message, whatsapp_url } from '$lib/site';

	let scrolled = $state(false);
	// Sobre los capítulos claros la barra cambia a material de papel
	let on_paper = $state(false);
	let menu_open = $state(false);
	let reduce_motion = $state(false);

	const links = [
		{ label: 'La despensa', href: '#despensa' },
		{ label: 'Arma tu pedido', href: '#pedido' },
		{ label: 'Nuestra esencia', href: '#esencia' },
		{ label: 'Visítanos', href: '#visitanos' }
	];

	function onScroll() {
		scrolled = window.scrollY > 32;
		const probe = 40;
		on_paper = [...document.querySelectorAll('.chapter-paper')].some((section) => {
			const rect = section.getBoundingClientRect();
			return rect.top <= probe && rect.bottom >= probe;
		});
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && menu_open) menu_open = false;
	}

	onMount(() => {
		onScroll();
		reduce_motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});
</script>

<svelte:window onscroll={onScroll} onkeydown={onKeydown} />

<header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
	<nav
		aria-label="Principal"
		class="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pr-2 pl-2.5 transition-[background-color,box-shadow] duration-500 ease-(--ease-out-strong) sm:h-16 {menu_open
			? 'material-night shadow-[0_0_0_1px_var(--night-line),0_16px_40px_-20px_oklch(0.05_0.02_310/0.9)]'
			: on_paper
				? 'tone-paper'
				: scrolled
					? 'material-night shadow-[0_0_0_1px_var(--night-line),0_16px_40px_-20px_oklch(0.05_0.02_310/0.9)]'
					: ''}"
	>
		<a href="#inicio" class="flex items-center gap-2.5 rounded-full pr-2">
			<span class="grid size-10 shrink-0 place-items-center rounded-full bg-ivory p-0.5 sm:size-11">
				<img src={logo} alt="" width="160" height="160" class="h-full w-full object-contain" />
			</span>
			<span class="nav-ink text-[0.98rem] font-semibold tracking-[-0.02em] text-ivory">
				Esencia <span class="text-gold">&</span> Grano
			</span>
		</a>

		<div class="hidden items-center gap-0.5 lg:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="nav-ink-dim rounded-full px-3.5 py-2 text-sm text-ivory-dim transition-colors duration-200 hover:text-ivory"
				>
					{link.label}
				</a>
			{/each}
		</div>

		<div class="flex items-center gap-1.5">
			<a
				href={whatsapp_url(default_whatsapp_message)}
				target="_blank"
				rel="noopener"
				class="inline-flex h-10 items-center gap-2 rounded-full bg-gold px-4 text-sm font-semibold text-gold-ink transition-transform duration-150 ease-(--ease-out-strong) active:scale-[0.97] sm:h-11"
			>
				<WhatsappIcon class="size-4" />
				<span>Pedir<span class="hidden sm:inline">&nbsp;por WhatsApp</span></span>
			</a>
			<button
				type="button"
				class="nav-ink grid size-11 place-items-center rounded-full text-ivory transition-[transform,background-color] duration-150 ease-out hover:bg-ivory/10 active:scale-95 lg:hidden"
				onclick={() => (menu_open = !menu_open)}
				aria-label={menu_open ? 'Cerrar menú' : 'Abrir menú'}
				aria-expanded={menu_open}
				aria-controls="mobile-menu"
			>
				{#if menu_open}<X class="size-5" />{:else}<Menu class="size-5" />{/if}
			</button>
		</div>
	</nav>

	{#if menu_open}
		<div
			id="mobile-menu"
			class="material-night mx-auto mt-2 max-w-6xl origin-top rounded-[1.75rem] p-3 shadow-[0_0_0_1px_var(--night-line),0_30px_60px_-30px_#000] lg:hidden"
			in:fly={{ y: reduce_motion ? 0 : -10, duration: 260, easing: cubicOut }}
			out:fade={{ duration: 140 }}
		>
			{#each links as link, i (link.href)}
				<a
					href={link.href}
					class="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium tracking-[-0.02em] text-ivory transition-colors duration-150 active:bg-ivory/10"
					onclick={() => (menu_open = false)}
					in:fly={{ y: reduce_motion ? 0 : 8, duration: 320, delay: 40 + i * 40, easing: cubicOut }}
				>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</header>
