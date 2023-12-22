import axios from '../common/request';

// 获取用户等级信息
export const getUserLevel = (params: any) => axios.request({
  method: 'get',
  url: '/user/level',
  params,  // 使用 params 而不是 data
});
