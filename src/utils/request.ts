import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getToken, TokenPrefix } from '/@/utils/auth';
import { showMessage } from '/@/utils/status';
import { defaultResponse } from '/@/utils/type';

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 5000,
});

// axios实例拦截请求
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${TokenPrefix}${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// axios实例拦截响应
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response;
    }
    showMessage(response.status);
    return response;
  },
  // 请求失败
  (error: any) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);
      return Promise.reject(response.data);
    }
    showMessage('网络连接异常,请稍后再试!');
  },
);

const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve) => {
    service
      .request<any, AxiosResponse<defaultResponse>>(conf)
      .then((res: AxiosResponse<defaultResponse>) => {
        const {
          data: { data },
        } = res;
        console.log(data);
        return resolve(data as T);
      });
  });
};

export function get<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' });
}

export function post<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'POST' });
}
export default service;

export type { AxiosInstance, AxiosResponse };
