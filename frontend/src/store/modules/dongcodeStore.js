// import http from '@/common/http-common'

export default {
  namespaced: true,
  state: {
    sidoNameSelected: null,
    gugunNameSelected: null,
    dongNameSelected: null,
    dongCodeSelected: null,
  },
  getters: {
    getSidoNameSelected(state) {
      return state.sidoNameSelected
    },
    getGugunNameSelected(state) {
      return state.gugunNameSelected
    },
    getDongNameSelected(state) {
      return state.dongNameSelected
    },
    getDongCodeSelected(state) {
      return state.dongCodeSelected
    }
  },
  mutations: {
    CLEAR_SIDO_NAME_SELECTED: (state) => {
      state.sidoNameSelected = null;
    },
    CLEAR_GUGUN_NAME_SELECTED: (state) => {
      state.gugunNameSelected = null;
    },
    CLEAR_DONG_NAME_SELECTED: (state) => {
      state.dongNameSelected = null;
    },
    CLEAR_DONG_CODE_SELECTED: (state) => {
      state.dongCodeSelected = null;
    },
    SET_SIDO_NAME_SELECTED: (state, sidoName) => {
      state.sidoNameSelected = sidoName;
    },
    SET_GUGUN_NAME_SELECTED: (state, gugunName) => {
      state.gugunNameSelected = gugunName;
    },
    SET_DONG_NAME_SELECTED: (state, dongName) => {
      state.dongNameSelected = dongName;
    },
    SET_DONG_CODE_SELECTED: (state, dongCode) => {
      state.dongCodeSelected = dongCode;
    }
  },
  actions: {
    clearSidoNameSelected: ({ commit }) => {
      commit('CLEAR_SIDO_NAME_SELECTED')
    },
    clearGugunNameSelected: ({ commit }) => {
      commit('CLEAR_GUGUN_NAME_SELECTED')
    },
    clearDongNameSelected: ({ commit }) => {
      commit('CLEAR_DONG_NAME_SELECTED')
    },
    clearDongCodeSelected: ({ commit }) => {
      commit('CLEAR_DONG_CODE_SELECTED')
    },
    setSidoNameSelected: ({ commit }, sidoName) => {
      commit('SET_SIDO_NAME_SELECTED', sidoName)
    },
    setGugunNameSelected: ({ commit }, gugunName) => {
      commit('SET_GUGUN_NAME_SELECTED', gugunName)
    },
    setDongNameSelected: ({ commit }, dongName) => {
      commit('SET_DONG_NAME_SELECTED', dongName)
    },
    setDongCodeSelected: ({ commit }, dongCode) => {
      commit('SET_DONG_CODE_SELECTED', dongCode)
    }
  }
}