import { defineConfig } from 'vitest/config';

// Config independiente de vite.config.ts: los tests unitarios no necesitan el plugin de SvelteKit ni Tailwind.
export default defineConfig({
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.ts'],
		restoreMocks: true
	}
});
