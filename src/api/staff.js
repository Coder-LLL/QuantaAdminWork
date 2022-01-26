import request from '../utils/request'

// 查询所有管理层接口
export const getAllStaff = () => {
  return request({
    url: 'https://www.quantacenter.com/api/administration/query/all',
    method: 'post',
  });
};

// 修改管理层信息接口
export const modifyStaff = (query) => {
  return request({
    url: 'https://www.quantacenter.com/api/administration/update',
    method: 'post',
    params: query
  });
};

// 新增管理层接口
export const insertStaff = (query) => {
  return request({
    url: 'https://www.quantacenter.com/api/administration/insert',
    method: 'post',
    params: query
  });
};

// 删除管理层接口
export const deleteStaff = (query) => {
  return request({
    url: 'https://www.quantacenter.com/api/administration/delete',
    method: 'post',
    params: query
  });
};
