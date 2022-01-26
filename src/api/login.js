import request from '../utils/request'

// 登陆接口
export const login = query => {
  return request({
    url: 'https://www.quantacenter.com/api/admin/login',
    method: 'post',
    //这里是调用地传递过来的参数列表
    params: query
  });
};
