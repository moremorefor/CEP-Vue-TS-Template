import Vue from 'vue'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators'
import ConfigStore from './modules/config'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  modules: {
    ConfigStore,
  },
})
export const configModule = getModule(ConfigStore, store)
