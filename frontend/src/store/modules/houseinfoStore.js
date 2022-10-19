// import http from '@/common/http-common'

export default {
  namespaced: true,
  state: {
    houseList: [],
    houseSelected: null,
  },
  getters: {
    getHouseList(state) {
      return state.houseList
    },
    getHouseSelected(state) {
      return state.houseSelected
    }
  },
  mutations: {
    CLEAR_HOUSE_LIST: (state) => {
      state.houseList = [];
    },
    CLEAR_HOUSE_SELECTED: (state) => {
      state.houseSelected = null;
    },
    SET_HOUSE_LIST: (state, houseList) => {
      state.houseList = houseList;
    },
    SET_HOUSE_SELECTED: (state, houseSelected) => {
      state.houseSelected = houseSelected;
    }
  },
  actions: {
    clearHouseList: ({ commit }) => {
      commit('CLEAR_HOUSE_LIST')
    },
    clearHouseSelected: ({ commit }) => {
      commit('CLEAR_HOUSE_SELECTED')
    },
    setHouseList: ({ commit }, houseList) => {
      commit('SET_HOUSE_LIST', houseList)
    },
    setHouseSelected: ({ commit }, houseSelected) => {
      commit('SET_HOUSE_SELECTED', houseSelected)
    }
  }
}