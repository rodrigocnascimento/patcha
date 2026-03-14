import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    provider: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
