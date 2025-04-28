import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'Menuchi API Unit Test',
    globals: true,
    environment: 'node',
    setupFiles: './test/vitest.setup.ts',
    include: ['./test/**/*.test.ts']
  }
});