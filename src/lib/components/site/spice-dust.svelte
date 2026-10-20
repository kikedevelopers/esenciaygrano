<script lang="ts">
	import { onMount } from 'svelte';
	import { prefers_reduced_motion } from '$lib/actions/scroll';

	/*
	  Polvo de especias en suspensión, iluminado por la luz cálida.
	  Canvas ligero: pocas partículas, DPR limitado y pausa total fuera de pantalla.
	*/
	let { class: class_name = '' }: { class?: string } = $props();

	let canvas: HTMLCanvasElement;

	interface Mote {
		x: number;
		y: number;
		radius: number;
		speed: number;
		sway: number;
		phase: number;
		alpha: number;
		hue: number;
	}

	onMount(() => {
		const context = canvas.getContext('2d');
		if (!context) return;

		const reduce_motion = prefers_reduced_motion();
		const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
		let width = 0;
		let height = 0;
		let motes: Mote[] = [];
		let raf = 0;
		let visible = true;
		let last = performance.now();

		function seed() {
			const rect = canvas.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			context!.setTransform(dpr, 0, 0, dpr, 0, 0);
			const count = width < 640 ? 22 : 44;
			motes = Array.from({ length: count }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				radius: 0.5 + Math.random() * 1.8,
				speed: 6 + Math.random() * 16,
				sway: 6 + Math.random() * 18,
				phase: Math.random() * Math.PI * 2,
				alpha: 0.25 + Math.random() * 0.6,
				hue: Math.random() < 0.8 ? 76 : 356
			}));
		}

		function draw(now: number) {
			const delta = Math.min((now - last) / 1000, 0.05);
			last = now;
			context!.clearRect(0, 0, width, height);
			for (const mote of motes) {
				mote.y -= mote.speed * delta;
				mote.phase += delta * 0.6;
				if (mote.y < -10) {
					mote.y = height + 10;
					mote.x = Math.random() * width;
				}
				const x = mote.x + Math.sin(mote.phase) * mote.sway;
				const flicker = 0.65 + Math.sin(mote.phase * 2.3) * 0.35;
				context!.beginPath();
				context!.fillStyle = `oklch(0.85 0.13 ${mote.hue} / ${mote.alpha * flicker})`;
				context!.arc(x, mote.y, mote.radius, 0, Math.PI * 2);
				context!.fill();
			}
		}

		function loop(now: number) {
			draw(now);
			if (visible && !document.hidden) raf = requestAnimationFrame(loop);
		}

		function start() {
			cancelAnimationFrame(raf);
			last = performance.now();
			raf = requestAnimationFrame(loop);
		}

		seed();
		if (reduce_motion) {
			draw(performance.now());
			return;
		}

		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) start();
		});
		observer.observe(canvas);

		const on_visibility = () => {
			if (!document.hidden && visible) start();
		};
		const on_resize = () => seed();
		document.addEventListener('visibilitychange', on_visibility);
		window.addEventListener('resize', on_resize, { passive: true });

		return () => {
			cancelAnimationFrame(raf);
			observer.disconnect();
			document.removeEventListener('visibilitychange', on_visibility);
			window.removeEventListener('resize', on_resize);
		};
	});
</script>

<canvas bind:this={canvas} class="pointer-events-none {class_name}" aria-hidden="true"></canvas>
