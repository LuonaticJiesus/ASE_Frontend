import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

export const API_BASE_URL = '/dev-api';
// export const API_TARGET_URL = 'http://112.126.71.119/';
export const API_TARGET_URL = 'http://112.126.71.119:3000/';
// mock
export const MOCK_API_BASE_URL = '/m1/2544583-0-default/four_s';
export const MOCK_API_TARGET_URL = 'http://127.0.0.1:4523';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },

  plugins: [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: resolve(__dirname, 'src') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: resolve(__dirname, 'types') + '/',
      },
    ],
  },

  server: {
    port: 5173,
    open: false,
    proxy: {
      // test
      [API_BASE_URL]: {
        target: API_TARGET_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
      },
      // mock
      [MOCK_API_BASE_URL]: {
        target: MOCK_API_TARGET_URL,
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), ''),
      },
    },
  },
});
