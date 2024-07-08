import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
// @ts-ignore
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [react(), viteTsConfigPaths(), svgrPlugin(), eslintPlugin()],
  server: {
    proxy: {
      '/api': 'http://localhost:8081/',
    },
  },
});
