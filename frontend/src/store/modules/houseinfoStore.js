// import http from '@/common/http-common'

export default {
  namespaced: true,
  state: {
    houseInfoList: [],
    houseInfoSelected: null,
  },
  getters: {
    getHouseInfoList(state) {
      return state.houseInfoList
    },
    getHouseInfoSelected(state) {
      return state.houseInfoSelected
    }
  },
  mutations: {
    CLEAR_HOUSE_INFO_LIST: (state) => {
      state.houseInfoList = [];
    },
    CLEAR_HOUSE_INFO_SELECTED: (state) => {
      state.houseInfoSelected = null;
    },
    SET_HOUSE_INFO_LIST: (state, houseInfoList) => {
      state.houseInfoList = houseInfoList;
    },
    SET_HOUSE_INFO_SELECTED: (state, houseInfoSelected) => {
      state.houseInfoSelected = houseInfoSelected;
    }
  },
  actions: {
    clearHouseInfoList: ({ commit }) => {
      commit('CLEAR_HOUSE_INFO_LIST')
    },
    clearHouseInfoSelected: ({ commit }) => {
      commit('CLEAR_HOUSE_INFO_SELECTED')
    },
    setHouseInfoList: ({ commit }, houseInfoList) => {
      commit('SET_HOUSE_INFO_LIST', houseInfoList)
    },
    setHouseInfoSelected: ({ commit }, houseInfoSelected) => {
      commit('SET_HOUSE_INFO_SELECTED', houseInfoSelected)
    }
  }
}