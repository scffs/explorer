import preact from '@preact/preset-vite'
import { defineConfig, splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
//
export default defineConfig(async () => ({
  plugins: [preact(), splitVendorChunkPlugin()],
  resolve: {
    alias: [
      { find: /^@vkontakte\/vkui$/, replacement: '@vkontakte/vkui/dist/cssm' }
    ]
  },
  build: {
    sourcemap: false,
    target: 'es2017',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        dead_code: true,
        unsafe: true
      },
      toplevel: true,
      keep_classnames: false,
      keep_fnames: false,
      safari10: false
    }
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**']
    }
  }
}))
