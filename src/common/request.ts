import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
class Request {
  private readonly baseURL: string;
  private readonly timeout: number;

  constructor() {
    this.baseURL = `${process.env.VUE_APP_BASE_API}`;
    this.timeout = 1000 * 60 * 5; // 五分钟
  }

  setInterceptor = ({ instance }: { instance: AxiosInstance }) => {
    instance.interceptors.request.use(
      (config) => config,
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
            case 404:
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
  };


  handleHeader = () => {
    return {
      'Content-Type': 'application/json;charset=UTF-8',
      token: undefined,
      saastoken: undefined,
    };
  };

  request<T>(config: AxiosRequestConfig): Promise<T> {
    const instance: AxiosInstance = axios.create();
    config = {
      data: {},
      params: {},
      timeout: this.timeout,
      baseURL: 'http://localhost:3000',
      withCredentials: true,
      ...config,
    };

    config.headers = { ...this.handleHeader(), ...config.headers };
    this.setInterceptor({ instance });

    return instance(config);
  }

  upload(url: string, baseURL: string = this.baseURL): string {
    return `${baseURL}${url}`;
  }
}

const request: Request = new Request()
export default request;
