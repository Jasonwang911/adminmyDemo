/*
*   axios基本配置、请求拦截器、相应拦截器
*
*/
// axios 引入
import axios from 'axios'
// vuex 仓库引入
import $store from '@/store/index'
// baseUrl引入： 
import { baseUrl, userBaseUrl } from '@/config/env'


// axios.defaults.headers.post['Content-Type'] = 'Content-Type: application/json'
// // baseURL配置
// axios.defaults.baseURL = baseUrl

const server = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: true,
  // headers: {'Content-Type': 'Content-Type: application/json'}
  // headers: {
  //   Authorization:`Bearer ${$store.state.user.token}`
  // }
});

const userServer = axios.create({
  baseURL: userBaseUrl,
  timeout: 10000,
  withCredentials: true,
  // headers: {'Content-Type': 'Content-Type: application/json'}
  // headers: {
  //   Authorization:`Bearer ${$store.state.user.token}`
  // }
});




// 请求拦截器
axios.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(function(response) {


  if(response.config.headers.Authorization && response.config.headers.Authorization.length> 7) {
      $store.dispatch('StoreToken', response.config.headers.Authorization.substring(7));
  }

  if(response.status == '203') {
    sessionStorage.clear();
    $store.dispatch('StoreToken', '');
    location.reload()
  }

  // 在相应中拦截 sessionId 
  return response
}, function(error) {
    return Promise.reject(error)
})


/*
*   axios的get请求
*   @params  url
*   @params  params
*   @returns {Promise}
*/
export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    // get 请求
    server.get(url, {
      headers: {
        Authorization:`Bearer ${$store.state.user.token}`
      }
    })
    .then(response => {
      if(response.config.headers.Authorization && response.config.headers.Authorization.length> 7) {
          $store.dispatch('StoreToken', response.config.headers.Authorization.substring(7));
      }
    
      if(response.status == '203') {
        sessionStorage.clear();
        $store.dispatch('StoreToken', '');
        location.reload()
      }
      // if(response.config.headers && response.config.headers.Authorization.length> 7) {
      //   $store.dispatch('StoreToken', response.config.headers.Authorization.substring(7));
      // }
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    })
  })
}
  
/*
*   axios的post请求
*   @params  url
*   @params  params
*   @returns {Promise}
*/
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    // post请求
    axios({
      method: 'post',
      url: `${baseUrl}${url}`,
      data: params,
      headers: {
        Authorization:`Bearer ${$store.state.user.token}`
      }
    })
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export function auth(url, params = {}) {
  return new Promise((resolve, reject) => {
    // post请求
    axios({
      method: 'post',
      withCredentials: true,
      url: `${userBaseUrl}${url}`,
      data: params,
    })
      .then(response => {
        // if(response.config.headers && response.config.headers.Authorization.length> 7) {
        //   $store.dispatch('StoreToken', response.config.headers.Authorization.substring(7));
        // }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export function userGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    // get 请求
    userServer.get(url, {
      headers: {
        Authorization:`Bearer ${$store.state.user.token}`
      }
    })
    .then(response => {
      // if(response.config.headers && response.config.headers.Authorization.length> 7) {
      //   $store.dispatch('StoreToken', response.config.headers.Authorization.substring(7));
      // }
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    })
  })
}

