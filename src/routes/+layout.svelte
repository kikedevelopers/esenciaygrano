<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/logo.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={logo} />
</svelte:head>
{@render children()}
