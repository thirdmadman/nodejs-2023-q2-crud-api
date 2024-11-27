// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  test: {
    globals: true,
    setupFiles: './src/__tests__/setupTests.ts',
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
  },
});
