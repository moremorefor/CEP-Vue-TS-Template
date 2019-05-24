import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from './modules/root'
Vue.use(Vuex)

export interface State {
  root: RootState
}

export const store = new Vuex.Store<State>({})
