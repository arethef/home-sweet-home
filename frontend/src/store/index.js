// import Vuex from 'vuex'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import userStore from "./modules/userStore"
import dongcodeStore from './modules/dongcodeStore'
import houseinfoStore from './modules/houseinfoStore'

// const store = new Vuex.Store({
//   modules: {
//     userStore
//   },
// })
const store = createStore({
  modules: {
    userStore,
    dongcodeStore,
    houseinfoStore
  },
  plugins: [createPersistedState()]
})

export default store