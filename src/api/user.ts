import axios from '../common/request';

// 获取用户等级信息
export const getUserLevel = (params: any) => axios.request({
  method: 'get',
  url: '/user/level',
  params,  // 使用 params 而不是 data
});

// 二维码 key 生成接口
export const getQrCodeKey = (params: any) => axios.request({
  method: 'get',
  url: '/login/qr/key',
  params,  // 使用 params 而不是 data
});

// 二维码生成接口
export const getQrCode = (params: any) => axios.request({
  method: 'get',
  url: '/login/qr/create',
  params,  // 使用 params 而不是 data
});

// 二维码检测扫码状态接口
export const checkQrCodeState = (params: any) => axios.request({
  method: 'get',
  url: '/login/qr/check',
  params,  // 使用 params 而不是 data
})

//
export const getAccountInfo = (params: any) => axios.request({
  method: 'get',
  url: '/user/account',
  params,  // 使用 params 而不是 data
});
export const getUserDetails = (params: any) => axios.request({
  method: 'get',
  url: '/user/detail',
  params,  // 使用 params 而不是 data
});

