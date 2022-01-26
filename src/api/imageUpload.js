import request from '../utils/request'

// 查询所有管理层接口
export const imageUpload = (query) => {
  console.log(query)

  return request({
    url: 'https://www.quantacenter.com/api/common/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: query
  });
};
