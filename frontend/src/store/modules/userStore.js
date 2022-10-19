import http from '@/common/http-common'

export default {
  namespaced: true,
  state: {
    isLoggedIn: false,
    userInfo: null,
  },
  getters: {
    getIsLoggedIn(state) {
      return state.isLoggedIn
    },
    getUserInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    SET_LOGIN(state, loggedIn) {
      state.isLoggedIn = loggedIn
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async userLogIn({ commit }, payload) {
      console.log('userStore actions userLogIn payload: ', payload);
      await http
        .post('/users/login', payload)
        .then((res) => {
          console.log('userStore actions userLogIn res: ', res);
          if (res.data.success) {
            console.log('userStore actions userLogIn success');
            commit('SET_LOGIN', true)
            commit('SET_USER_INFO', res.data.userInfo)
            sessionStorage.setItem('userId', res.data.userInfo.id)
            sessionStorage.setItem('accessToken', res.data.token.accessToken)
            sessionStorage.setItem('refreshToken', res.data.token.refreshToken)
          } else {
            console.log('userStore actions userLogIn fail');
            commit('SET_LOGIN', false)
          }
          console.log('userStore actions userLogIn res | getIsLoggedIn: ',);
        })
        .catch((err) => {
          console.log('userStore actions userLogIn err: ', err)
        })
    },
    userLogOut({ commit }) {
      console.log('userStore actions userLogOut');
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('refreshToken')
      commit('SET_LOGIN', false)
      commit('SET_USER_INFO', null)
    },
    async userUserInfo({ commit }, userId) {
      console.log('userStore actions userUserInfo userId: ', userId);
      await http
        .get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
          }
        })
        .then((res) => {
          console.log('userStore actions userUserInfo res: ', res);
          if (res.data.success) {
            console.log('userStore actions userUserInfo success');
            commit('SET_USER_INFO', res.data.userInfo)
          } else {
            console.log('userStore actions userUserInfo fail');
          }
        })
        .catch((err) => {
          console.log('userStore actions userUserInfo err: ', err);
        })

    }
  }
}