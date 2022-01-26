import request from '../utils/request'

// 查询所有活动接口
export const getAllProject = () => {
  return request({
    url: 'https://www.quantacenter.com/api/project/query/all',
    method: 'post',
  });
};

// 查询最近活动接口
export const getRecentProject = () => {
  return request({
    url: 'https://www.quantacenter.com/api/project/query/recent',
    method: 'post',
  });
};

// 修改活动接口
export const modifyProject = (query) => {
  console.log(query)
  return request({
    url: 'https://www.quantacenter.com/api/project/update',
    method: 'post',
    params: query
  });
};



// 删除项目接口
export const deleteProject = (query) => {
  return request({
    url: 'https://www.quantacenter.com/api/project/delete',
    method: 'post',
    params: query
  });
};

// 删除项目接口
export const insertProject = (query) => {
  console.log(query)
  return request({
    url: 'https://www.quantacenter.com/api/project/insert',
    method: 'post',
    params: query
  });
};
