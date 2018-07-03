/*
*   axios基本配置、请求拦截器、相应拦截器
*
*/
// axios 引入
import axios from 'axios'
// vuex 仓库引入
import $store from '@/store/index'
// baseUrl引入：
// import { baseUrl } from '@/config/env'

// axios.defaults.headers.post['Content-Type'] = 'Content-Type: application/json'
// // baseURL配置
// axios.defaults.baseURL = 'http://118.190.152.1:8084'


const server8084 = axios.create({
    baseURL: 'http://118.190.152.1:8084/user',
    timeout: 10000,
    // headers: {'Content-Type': 'Content-Type: application/json'}
});

// 请求拦截器
axios.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(function(response) {
    // 在相应中拦截 sessionId
    // store.dispatch('SESSION_ID', response.data.head.SESSION_ID)
    return response
}, function(error) {
    return Promise.reject(error)
})


/*
*   axios的post请求
*   @params  url
*   @params  params
*   @returns {Promise}
*/
export function posts(url, params = {}) {
    return new Promise((resolve, reject) => {
      // post请求
      server8084.post(url, params)
        .then(response => {
        console.log(response.config.headers.Authorization.length> 7)
        console.log(response.config.headers.Authorization.substring(7))
        if(response.config.headers.Authorization.length> 7) {
            $store.dispatch('StoreToken', response.config.headers.Authorization.substring(7));
        }
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
