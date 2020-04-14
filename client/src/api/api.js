import axios from 'axios';
import Qs from 'qs';
import { Loading } from 'element-ui';

import {localStore} from '@/util/localStore.js'

// let baseUrl = '/api';
let baseUrl = 'http://119.29.94.99:3013';

let loading;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response)
  loading.close()
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

const postRequest = (url,params) => {
  let customId = localStore.get('custom-id') || "";
  return axios({
    method: 'post',
    url: baseUrl + url,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
      // 'Content-Type':'application/json;charset=utf-8',
      'custom-id':customId
    },
    transformRequest:[function(data){
      data = Qs.stringify(data);
      return data
    }],
    data: params
  });
}

const getRequest = (url,params) => {
  let customId = localStore.get('custom-id') || "";
  return axios({
    method: 'get',
    url: baseUrl + url,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
      'custom-id':customId
    },
    transformRequest:[function(data){
      data = Qs.stringify(data);
      return data
    }],
    data: params
  });
}


// 注册
export const sign = params => postRequest('/sign',params)

// 登录
export const login = params => postRequest('/login',params)

// 获取用户信息
export const getUserInfo = _ => getRequest('/userInfo');

// 获取当前工具人信息
export const getGongjurenInfo = params => postRequest('/gongjurenInfo',params)

// 获取当前工具人信息
export const deleteGongjurenInfo = params => postRequest('/deleteGongjuren',params)

// 新增数据
export const addItem = params => postRequest('/addItem',params)

// 获取叠叠乐列表
export const ddleList = params => postRequest('/ddleList',params)

// 测试下载
export const download = () => {
  // return axios.post('/api/downLoad',{"name":"boolk"})
  return axios.post('/api/downLoad',{}, {
    responseType: 'blob'
  }).then((res) => {
    console.log('res', res);
    const blob = res.data;
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
      console.log(e)
      // const a = document.createElement('a');
      // a.download = `文件名称.json`;
      // // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
      // a.href = e.target.result;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
    };
  }).catch((err) => {
    console.log(err.message);
  });
}