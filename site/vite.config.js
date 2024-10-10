// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

export default defineConfig({
  root: 'site',
  plugins: [react()],
  build :{
    rollupOptions: {
      input: {
        app: fileURLToPath(new URL('index.html', import.meta.url)),
        jeopardy: fileURLToPath(new URL('my-work/jeopardy/index.html', import.meta.url)),
        404: fileURLToPath(new URL('404.html', import.meta.url)),
        clf: fileURLToPath(new URL('my-work/cherry-lane-farms/index.html', import.meta.url)),
        fonts: fileURLToPath(new URL('src/assets/css/fonts.scss', import.meta.url)),
      },
    }
  },
  resolve: {
    alias: [
      { find: "@components", replacement: fileURLToPath(new URL('src/assets/components', import.meta.url)) },
      { find: "@utils", replacement: fileURLToPath(new URL('src/assets/utils', import.meta.url)) },
      { find: "@img", replacement: fileURLToPath(new URL('src/assets/img', import.meta.url)) },
      { find: "@css", replacement: fileURLToPath(new URL('src/assets/css', import.meta.url)) },
    ]
  }
});
