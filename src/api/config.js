import axios from 'axios'
import qs from 'qs'
import Vue from '../main.js'

const ERR_OK = 0
const ERR_LOGIN = 99
//http://dxq.hzsw-tech.com/pointcoil/
const Axios = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'https://www.hzdxq.cn/pointcoil/',
  timeout: 20000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
})

let CancelToken = axios.CancelToken

// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    // 在发送请求之前做某件事   是否带有token
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete' || config.method === 'get') {
      // config.headers.token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
      // config.headers.userId = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : ''
      // 转字符串
      // config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error.data.error.message)
  }
)

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    console.log(res)
    if (res.headers.token) {
      sessionStorage.setItem("token", res.headers.token);
    }
    if (res.data.code == '001005') {
      // alert("登录失效，请重新登录")
      Vue.$router.push({
        path: "/"
      });
      Vue.$cookies.remove("userInfo");
      Vue.$notify({
        title: '提示',
        message: '登陆失效',
        type: 'warning',
        duration: 1000
      });
    }
    if (res.data) {
      return new Promise((resolve) => {
        resolve(res.data)
      })
    } else {
      return Promise.reject('请求异常')
    }
  },
  error => {
    if (error.message) {
      return Promise.reject(error.message)
    }
    // 返回 response 里的错误信息
    const errorInfo = error.data.error ? error.data.error.message : error.data
    return Promise.reject(errorInfo)
  }
)

export default Axios
