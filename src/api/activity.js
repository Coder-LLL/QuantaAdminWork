import request from '../utils/request'

// 查询所有活动接口
export const getAllActivity = () => {
  return request({
    url: 'https://www.quantacenter.com/api/activity/query/all',
    method: 'post',
  });
};


// 查询所有活动接口
export const getRecentActivity = () => {
  return request({
    url: 'https://www.quantacenter.com/api/activity/query/recent',
    method: 'post',
  });
};

// 修改活动接口
export const modifyActivity = (query) => {
  return request({
    url: 'https://www.quantacenter.com/api/activity/update',
    method: 'post',
    params: query
  });
};


// 新增管理层接口
export const insertActivity = (query) => {
  console.log(query)

  return request({
    url: 'https://www.quantacenter.com/api/activity/insert',
    method: 'post',
    params: query
  });
};

// 删除活动接口
export const deleteActivity = (query) => {

  return request({
    url: 'https://www.quantacenter.com/api/activity/delete',
    method: 'post',
    params: query
  });
};
