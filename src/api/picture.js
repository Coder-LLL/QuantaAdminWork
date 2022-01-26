import request from '../utils/request'

// 查询所有轮播图接口
export const getAllPicture = () => {
  return request({
    url: 'https://www.quantacenter.com/api/rotation/query/all',
    method: 'post',
  });
};


// 修改轮播图接口
export const modifyPicture = (query) => {
  return request({
    url: 'https://www.quantacenter.com/api/rotation/update',
    method: 'post',
    params: query
  });
};


// 新增轮播图接口
export const insertPicture = (query) => {
  console.log(query)
  return request({
    url: 'https://www.quantacenter.com/api/rotation/insert',
    method: 'post',
    params: query
  });
};

// 删除轮播图接口
export const deletePicture = (query) => {
  return request({
    url: 'https://www.quantacenter.com/api/rotation/delete',
    method: 'post',
    params: query
  });
};
