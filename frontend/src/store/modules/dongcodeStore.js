// import http from '@/common/http-common'

export default {
  namespaced: true,
  state: {
    sidoName: null,
    gugunName: null,
    dongName: null
  },
  getters: {
  },
  mutations: {
    CLEAR_SIDO_NAME: (state) => {
      state.sidoName = null;
    },
    CLEAR_GUGUN_NAME: (state) => {
      state.gugunName = null;
    },
    CLEAR_DONG_NAME: (state) => {
      state.dongName = null;
    },
    SET_SIDO_NAME: (state, sidoName) => {
      state.sidoName = sidoName;
    },
    SET_GUGUN_NAME: (state, gugunName) => {
      state.gugunName = gugunName;
    },
    SET_DONG_NAME: (state, dongName) => {
      state.dongName = dongName;
    },
  },
  actions: {
    clearSidoName: ({ commit }) => {
      commit('CLEAR_SIDO_NAME')
    },
    clearGugunName: ({ commit }) => {
      commit('CLEAR_GUGUN_NAME')
    },
    clearDongName: ({ commit }) => {
      commit('CLEAR_DONG_NAME')
    },
    setSidoName: ({ commit }, sidoName) => {
      commit('SET_SIDO_NAME', sidoName)
    },
    setGugunName: ({ commit }, gugunName) => {
      commit('SET_GUGUN_NAME', gugunName)
    },
    setDongName: ({ commit }, dongName) => {
      commit('SET_DONG_NAME', dongName)
    },
  }
}