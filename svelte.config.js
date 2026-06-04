import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		// Adaptador estático para GitHub Pages (sitio totalmente prerenderizado).
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		// En GitHub Pages de proyecto el sitio se sirve bajo /<repo>.
		// El workflow define BASE_PATH=/esenciaygrano al compilar.
		paths: {
			base: process.env.BASE_PATH || ''
		}
	}
};

export default config;
