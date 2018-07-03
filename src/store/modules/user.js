import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
    rootAdmin: sessionStorage.getItem('rootAdmin') ? Number(sessionStorage.getItem('rootAdmin')) : false,
    status: '',
    code: '',
    // token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTUyODAxNjM2NCwiaWF0IjoxNTI3NDExNTY0fQ.zBKT8gw2AfO1CV33TzyXVWOAyeu4B535bHqSTfzKHbShHVQ-zDcivgTPHulM-RKGJA7i_vNNwZ2htnDfdw4Ngw',
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    AM_STORE_USER_INFO: (state, res) => {
      state.userInfo = res;
      console.log('====>',res)
      if(res.authorities.length > 1) {
        state.rootAdmin = true;
        sessionStorage.setItem('rootAdmin', 1)
      }else {
        state.rootAdmin = false;
        sessionStorage.setItem('rootAdmin', 0)
      }
      
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      // sessionStorage.setItem('token', res)
      state.token = token
    },
    CLEAR_TOKEN: (state) => {
      state.token = '';
    },
    SET_USER: (state, res) => {
      state.userInfo = res;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 官网保存用户信息
    AmStoreUserInfo({commit}, res) {
      commit('AM_STORE_USER_INFO', res);
    },
    // 保存token
    StoreToken({commit}, res) {
      sessionStorage.setItem('token', res)
      commit('SET_TOKEN', res);
    },
    // 清除token
    ClearToken({commit}) {
      commit('CLEAR_TOKEN');
    },
    // 保存用户信息
    StoreUser({commit}, res) {
      commit('SET_USER', res);
    },
    // 用户名登录
    LoginByUsername({ commit }, res) {
      // const username = userInfo.username.trim()
      // return new Promise((resolve, reject) => {
      //   loginByUsername(username, userInfo.password).then(response => {
      //     const data = response.data
      //     commit('SET_TOKEN', data.token)
      //     setToken(response.data.token)
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
      // commit('SET_TOKEN', res);
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
