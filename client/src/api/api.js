import axios from 'axios';
import Qs from 'qs';

let baseUrl = '/api'
const postRequest = (url,params) => {
  return axios({
    method: 'post',
    url: baseUrl + url,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
      // 'Content-Type':'application/json;charset=utf-8'
    },
    transformRequest:[function(data){
      data = Qs.stringify(data);
      return data
    }],
    data: params
  });
}

const getRequest = (url,params) => {
  return axios({
    method: 'get',
    url: baseUrl + url,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
      'self':'1245'
    },
    transformRequest:[function(data){
      data = Qs.stringify(data);
      return data
    }],
    data: params
  });
}

// 登录
export const login = params => postRequest('/login',params)

// 获取列表
export const getMyList = params => getRequest('/myList',params)