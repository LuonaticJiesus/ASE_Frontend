import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

export const API_BASE_URL = '/dev-api';
export const API_TARGET_URL = 'http://112.126.71.119:80/';
// mock
export const MOCK_API_BASE_URL = '/m1/2544583-0-default/four_s';
export const MOCK_API_TARGET_URL = 'http://127.0.0.1:4523';

export const CLOUD_BASE_URL = '/download-api';

export const CLOUD_TARGET_URL =
  'https://2023-ase-quadssss-1314332102.cos.ap-beijing.myqcloud.com/';
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  define: {
    'process.env': {},
  },

  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console:
          command === 'build' &&
          loadEnv(mode, __dirname).VITE_API_ENV === 'prod',
        drop_debugger:
          command === 'build' &&
          loadEnv(mode, __dirname).VITE_API_ENV === 'prod',
      },
    },
    rollupOptions: {
      output: {
        //解决打包时Some chunks are larger警告，分块打包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
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
      '/prod-api': {
        target: 'http://124.220.153.34:9097/',
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp('^/prod-api'), ''),
      },
      [CLOUD_TARGET_URL]: {
        target:
          'https://2023-ase-quadssss-1314332102.cos.ap-beijing.myqcloud.com/',
        changeOrigin: true,
      },
    },
  },
}));
