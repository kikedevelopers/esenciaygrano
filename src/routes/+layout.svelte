<script lang="ts">
	import '../app.css';
	import apple_touch_icon from '$lib/assets/apple-touch-icon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
	<link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
	<link rel="apple-touch-icon" href={apple_touch_icon} />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>
{@render children()}
