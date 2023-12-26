// src/common/request.ts

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '@/store'
import * as process from 'process'

// console.log(process.env, 'log')
class Request {
  private readonly baseURL: string;
  private readonly timeout: number;

  constructor() {
    this.baseURL = `${process.env.REACT_APP_API}`;
    this.timeout = 1000 * 60 * 5; // 五分钟
  }

  private getUserInfoFromRedux(): any {
    return store.getState().user?.userInfo;
  }

  private setInterceptor = ({ instance }: { instance: AxiosInstance }) => {
    instance.interceptors.request.use(
      (config) => {
        // 获取 Redux 中的用户信息
        const userInfo = this.getUserInfoFromRedux();

        // 手动添加 cookie
        if (userInfo && userInfo.cookie) {
          if (config.method === 'GET') {
            config.params = { ...(config.params || {}), cookie: userInfo.cookie };
          } else {
            config.data = { ...(config.data || {}), cookie: userInfo.cookie };
          }
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.config.method === 'delete') {
          return res;
        } else {
          return res.data;
        }
      },
      (error: AxiosError) => {
        let msg: string = '网络连接故障';

        if (error.response) {
          const status = error.response.status;

          switch (status) {
            case 400:
              msg = '请求错误';
              break;
            case 401:
              msg = 'token 失效，请重新登录';
              // 这里可以触发退出的 action 或者重定向到登录页面
              break;
            case 403:
              msg = '拒绝访问';
              break;
            case 406:
              msg = '请求地址错误';
              break;
            case 500:
              msg = '服务器故障';
              break;
          }
        }

        // 返回一个自定义的错误对象，包含错误信息和状态码
        return Promise.reject({ message: msg, status: error.response?.status });
      }
    );

    // ... 其他拦截器逻辑
  };

  private handleHeader = () => {
    return {
      'Content-Type': 'application/json;charset=UTF-8',
      token: undefined,
      saastoken: undefined,
    };
  };

  public request<T>(config: AxiosRequestConfig): Promise<T> {
    const instance: AxiosInstance = axios.create();
    config = {
      data: {},
      params: {},
      timeout: this.timeout,
      baseURL: process.env.REACT_APP_API,
      withCredentials: true,
      ...config,
    };

    config.headers = { ...this.handleHeader(), ...config.headers };
    this.setInterceptor({ instance });

    return instance(config);
  }

  public upload(url: string, baseURL: string = this.baseURL): string {
    return `${baseURL}${url}`;
  }
}

const request: Request = new Request();
export default request;
