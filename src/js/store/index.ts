import Vue from 'vue'
import Vuex from 'vuex'
import { IRootState } from './modules/root'
Vue.use(Vuex)

export interface State {
  root: IRootState
}

export const store = new Vuex.Store<State>({})
