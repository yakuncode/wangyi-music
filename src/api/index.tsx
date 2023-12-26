import axios from '../common/request';

// @ts-ignore
export const getCat = (params: any) => axios.request({
  method: 'get',
  url: '/captcha/sent',
  params,  // 使用 params 而不是 data
});
// @ts-ignore
export const signIn = (params: any) => axios.request({
  method: 'get',
  url: '/login/cellphone',
  params,  // 使用 params 而不是 data
});

// 退出
export const loginOut = (params: any) => axios.request({
  method: 'get',
  url: '/logout',
  params,  // 使用 params 而不是 data
});
