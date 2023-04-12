import { ProxyOptions } from 'vite';

type ProxyTargetList = Record<string, ProxyOptions>;

// test
export const API_BASE_URL = '/api';
export const API_TARGET_URL = 'http://localhost:3000';

// mock
export const MOCK_API_BASE_URL = '/m1/2544583-0-default/back';
export const MOCK_API_TARGET_URL = 'http://127.0.0.1:4523';

const init: ProxyTargetList = {
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
      path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '/api'),
  },
};

export default init;
