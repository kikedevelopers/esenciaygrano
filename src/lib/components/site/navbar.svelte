<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Menu, X } from '@lucide/svelte';

	let scrolled = $state(false);
	let menuOpen = $state(false);

	const links = [
		{ label: 'Catálogo', href: '#categorias' },
		{ label: 'Nuestra esencia', href: '#esencia' },
		{ label: 'Beneficios', href: '#beneficios' },
		{ label: 'Preguntas', href: '#preguntas' }
	];

	function onScroll() {
		scrolled = window.scrollY > 24;
	}
</script>

<svelte:window onscroll={onScroll} />

<header
	class="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300"
	class:bg-background={scrolled}
	class:shadow-[0_1px_0_0_var(--border)]={scrolled}
	class:backdrop-blur-md={scrolled}
>
	<nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-18">
		<a href="#inicio" class="flex items-center gap-2.5">
			<span
				class="grid size-11 shrink-0 place-items-center rounded-full bg-white p-1 shadow-sm ring-1 ring-black/5"
			>
				<img src="/logo.png" alt="Esencia & Grano" class="h-full w-full object-contain" />
			</span>
			<span class="flex flex-col leading-none">
				<span
					class="font-serif text-lg font-semibold tracking-tight"
					class:text-foreground={scrolled}
					class:text-white={!scrolled}
				>
					Esencia <span class="text-magenta">&</span> Grano
				</span>
				<span
					class="text-[0.65rem] tracking-[0.18em] uppercase"
					class:text-muted-foreground={scrolled}
					class:text-white={!scrolled}
					class:opacity-70={!scrolled}>La despensa de la 21</span
				>
			</span>
		</a>

		<div class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded-full px-3.5 py-2 text-sm font-medium transition-colors"
					class:text-foreground={scrolled}
					class:hover:bg-muted={scrolled}
					class:text-white={!scrolled}
					class:hover:bg-white={!scrolled}
					class:hover:text-primary={!scrolled}
				>
					{link.label}
				</a>
			{/each}
		</div>

		<div class="hidden md:block">
			<Button href="#visitanos" class="rounded-full bg-magenta px-5 text-magenta-foreground hover:bg-magenta/85">
				Visítanos
			</Button>
		</div>

		<button
			class="grid size-10 place-items-center rounded-full transition active:scale-95 md:hidden"
			class:text-foreground={scrolled}
			class:text-white={!scrolled}
			onclick={() => (menuOpen = !menuOpen)}
			aria-label="Abrir menú"
		>
			{#if menuOpen}<X class="size-5" />{:else}<Menu class="size-5" />{/if}
		</button>
	</nav>

	{#if menuOpen}
		<div class="border-t border-border bg-background px-5 py-4 md:hidden">
			<div class="flex flex-col gap-1">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
						onclick={() => (menuOpen = false)}
					>
						{link.label}
					</a>
				{/each}
				<Button
					href="#visitanos"
					class="mt-2 w-full rounded-full bg-magenta text-magenta-foreground hover:bg-magenta/85"
					onclick={() => (menuOpen = false)}
				>
					Visítanos
				</Button>
			</div>
		</div>
	{/if}
</header>
