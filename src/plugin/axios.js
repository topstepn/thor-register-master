import axios from 'axios'
import { Toast } from 'mand-mobile'
import storage from "./storage";
const instance = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? '' : process.env.VUE_APP_API,//设置默认接口地址
  timeout: 10000, //设置请求时间
  headers: {
    "Content-Type": "application/json",
  }
})

instance.interceptors.request.use(function (config) {
  debugger

  const headers = {
  }
  if (storage.get('token') ) {
    headers['Authorization'] =  'Bearer ' + storage.get('token')
  }
  config.headers = { ...headers, ...config.headers }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  try{
    if(response.data.code==200||response.data.code==0) return response.data;
    Toast.failed(response.data.message||response.data.msg||response.statusText);
  }catch(e){}
  return Promise.reject(response);
}, error => {
  if (!error) {
    Toast.failed('服务器出错');
    return Promise.reject({ message: '服务器出错' })
  }
  try{
    Toast.failed(error.response.data.message||error.response.data.msg||error.response.statusText);
  }catch(e){}
  return Promise.reject(error.response);
});

export default instance
