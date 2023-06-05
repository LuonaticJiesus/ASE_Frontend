// vite.config.ts
import { defineConfig } from "file:///G:/2023ASE/Alpha_Frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///G:/2023ASE/Alpha_Frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///G:/2023ASE/Alpha_Frontend/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueSetupExtend from "file:///G:/2023ASE/Alpha_Frontend/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import AutoImport from "file:///G:/2023ASE/Alpha_Frontend/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///G:/2023ASE/Alpha_Frontend/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///G:/2023ASE/Alpha_Frontend/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "G:\\2023ASE\\Alpha_Frontend";
var API_BASE_URL = "/dev-api";
var API_TARGET_URL = "http://112.126.71.119:80/";
var MOCK_API_BASE_URL = "/m1/2544583-0-default/four_s";
var MOCK_API_TARGET_URL = "http://127.0.0.1:4523";
var vite_config_default = defineConfig({
  define: {
    "process.env": {}
  },
  plugins: [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: resolve(__vite_injected_original_dirname, "src") + "/"
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: resolve(__vite_injected_original_dirname, "types") + "/"
      }
    ]
  },
  server: {
    port: 5173,
    open: false,
    proxy: {
      // test
      [API_BASE_URL]: {
        target: API_TARGET_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), "")
      },
      // mock
      [MOCK_API_BASE_URL]: {
        target: MOCK_API_TARGET_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), "")
      },
      "/prod-api": {
        target: "http://124.220.153.34:9097/",
        rewrite: (path) => path.replace(new RegExp("^/prod-api"), "")
      }
    }
  }
});
export {
  API_BASE_URL,
  API_TARGET_URL,
  MOCK_API_BASE_URL,
  MOCK_API_TARGET_URL,
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFwyMDIzQVNFXFxcXEFscGhhX0Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJHOlxcXFwyMDIzQVNFXFxcXEFscGhhX0Zyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9HOi8yMDIzQVNFL0FscGhhX0Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuaW1wb3J0IHZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY29uc3QgQVBJX0JBU0VfVVJMID0gJy9kZXYtYXBpJztcbmV4cG9ydCBjb25zdCBBUElfVEFSR0VUX1VSTCA9ICdodHRwOi8vMTEyLjEyNi43MS4xMTk6ODAvJztcbi8vIG1vY2tcbmV4cG9ydCBjb25zdCBNT0NLX0FQSV9CQVNFX1VSTCA9ICcvbTEvMjU0NDU4My0wLWRlZmF1bHQvZm91cl9zJztcbmV4cG9ydCBjb25zdCBNT0NLX0FQSV9UQVJHRVRfVVJMID0gJ2h0dHA6Ly8xMjcuMC4wLjE6NDUyMyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBkZWZpbmU6IHtcbiAgICAncHJvY2Vzcy5lbnYnOiB7fSxcbiAgfSxcblxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlSnN4KCksXG4gICAgdnVlU2V0dXBFeHRlbmQoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIC8vIC9AL3h4eHggPT4gc3JjL3h4eHhcbiAgICAgIHtcbiAgICAgICAgZmluZDogL1xcL0BcXC8vLFxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSArICcvJyxcbiAgICAgIH0sXG4gICAgICAvLyAvIy94eHh4ID0+IHR5cGVzL3h4eHhcbiAgICAgIHtcbiAgICAgICAgZmluZDogL1xcLyNcXC8vLFxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICd0eXBlcycpICsgJy8nLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzMsXG4gICAgb3BlbjogZmFsc2UsXG4gICAgcHJveHk6IHtcbiAgICAgIC8vIHRlc3RcbiAgICAgIFtBUElfQkFTRV9VUkxdOiB7XG4gICAgICAgIHRhcmdldDogQVBJX1RBUkdFVF9VUkwsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtBUElfQkFTRV9VUkx9YCksICcnKSxcbiAgICAgIH0sXG4gICAgICAvLyBtb2NrXG4gICAgICBbTU9DS19BUElfQkFTRV9VUkxdOiB7XG4gICAgICAgIHRhcmdldDogTU9DS19BUElfVEFSR0VUX1VSTCxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT5cbiAgICAgICAgICBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7TU9DS19BUElfQkFTRV9VUkx9YCksICcnKSxcbiAgICAgIH0sXG4gICAgICAnL3Byb2QtYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTI0LjIyMC4xNTMuMzQ6OTA5Ny8nLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoJ14vcHJvZC1hcGknKSwgJycpLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1RLFNBQVMsb0JBQW9CO0FBQ2hTLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFDcEMsU0FBUyxlQUFlO0FBUHhCLElBQU0sbUNBQW1DO0FBU2xDLElBQU0sZUFBZTtBQUNyQixJQUFNLGlCQUFpQjtBQUV2QixJQUFNLG9CQUFvQjtBQUMxQixJQUFNLHNCQUFzQjtBQUduQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixlQUFlLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsZUFBZTtBQUFBLElBQ2YsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQTtBQUFBLE1BRUw7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsUUFBUSxrQ0FBVyxLQUFLLElBQUk7QUFBQSxNQUMzQztBQUFBO0FBQUEsTUFFQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxRQUFRLGtDQUFXLE9BQU8sSUFBSTtBQUFBLE1BQzdDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQTtBQUFBLE1BRUwsQ0FBQyxZQUFZLEdBQUc7QUFBQSxRQUNkLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxjQUFjLEdBQUcsRUFBRTtBQUFBLE1BQ3BFO0FBQUE7QUFBQSxNQUVBLENBQUMsaUJBQWlCLEdBQUc7QUFBQSxRQUNuQixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FDUixLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksbUJBQW1CLEdBQUcsRUFBRTtBQUFBLE1BQ3hEO0FBQUEsTUFDQSxhQUFhO0FBQUEsUUFDWCxRQUFRO0FBQUEsUUFDUixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLFlBQVksR0FBRyxFQUFFO0FBQUEsTUFDOUQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
