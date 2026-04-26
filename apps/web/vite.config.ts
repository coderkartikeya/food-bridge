/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from "@tailwindcss/vite";


import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));


export default defineConfig({
  plugins: [react(), tailwindcss(), babel({
    presets: [reactCompilerPreset()]
  })],
  server: {
    host: "0.0.0.0",
    port: 80,
    allowedHosts: ["web"],
    hmr: {
      clientPort: 80
    }
  },
  
  test: {
    projects: [{
      extends: true,
      plugins: [
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  },
  resolve:{
    alias:{
      "@stories": path.resolve(__dirname,"./src/stories"),
      "@components": path.resolve(__dirname,"./src/components"),
      "@/types": path.resolve(__dirname,"./src/types"),
      "@/services":path.resolve(__dirname,"./src/services")
    }
  }
});