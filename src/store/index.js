import Vue from 'vue'
import Vuex from 'vuex'
//模块话导入modules
import tabs from './tabs.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: ''
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    }
  },
  modules: {
    tabs
  }
})
