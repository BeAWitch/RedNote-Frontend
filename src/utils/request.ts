import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStore } from "@/stores/userStore";
import { ElMessage } from "element-plus";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();
    if (userStore.getToken()) {
      config.headers.accessToken = userStore.getToken();
      config.headers.userId = userStore.getUserInfo().id;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code } = response.data;
    if (code === 200) {
      return response.data;
    }
    // 响应数据为二进制流处理(Excel导出)
    // if (response.data instanceof ArrayBuffer) {
    //   return response;
    // }
    if (code == 401) {
      ElMessage.warning("登录过期，请重新登录");
      window.localStorage.clear();
    }
    return Promise.reject(response.data);
  },
  (error) => { // 错误处理函数
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          ElMessage.warning("登录过期，请重新登录");
          window.localStorage.clear();
          break;
        case 404:
          ElMessage.warning("请求地址不存在");
          break;
        case 500:
          ElMessage.warning('服务器内部错误');
          break;
        default:
          ElMessage.error(data?.message || '请求失败');
      }
    } else if (error.request) {
      ElMessage.error('网络连接失败，请检查网络');
    } else {
      ElMessage.error('请求配置错误');
    }

    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default service;
