<script lang="ts">
	const links = [
		{ label: 'Catálogo', href: '#categorias' },
		{ label: 'Nuestra esencia', href: '#esencia' },
		{ label: 'Beneficios', href: '#beneficios' },
		{ label: 'Preguntas', href: '#preguntas' },
		{ label: 'Visítanos', href: '#visitanos' }
	];
	const year = 2026;
</script>

<footer class="border-t border-border bg-secondary/40">
	<div class="mx-auto max-w-6xl px-5 py-14">
		<div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
			<div class="max-w-sm">
				<div class="flex items-center gap-3">
					<img src="/logo.png" alt="Esencia & Grano" class="h-12 w-12 object-contain" />
					<div class="leading-none">
						<p class="font-serif text-lg font-semibold">
							Esencia <span class="text-magenta">&</span> Grano
						</p>
						<p class="mt-1 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
							La despensa de la 21
						</p>
					</div>
				</div>
				<p class="mt-5 text-sm leading-relaxed text-muted-foreground">
					Condimentos, granos y frutos secos seleccionados a granel. El sabor auténtico
					de tu despensa de barrio.
				</p>
			</div>

			<nav class="flex flex-col gap-3">
				<p class="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
					Navegación
				</p>
				{#each links as link (link.href)}
					<a href={link.href} class="text-sm text-foreground/80 transition-colors hover:text-primary">
						{link.label}
					</a>
				{/each}
			</nav>
		</div>

		<div
			class="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© {year} Esencia & Grano · La Despensa de la 21.</p>
			<p>Hecho con esencia y buen grano.</p>
		</div>
	</div>
</footer>
