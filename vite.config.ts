import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		// .impeccable guarda capturas y bocetos de diseño: no deben disparar recargas del dev server
		watch: { ignored: ['**/.impeccable/**'] }
	}
});
