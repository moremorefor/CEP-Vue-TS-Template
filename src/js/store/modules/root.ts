import {
  Mutation,
  MutationAction,
  Action,
  VuexModule,
  getModule,
  Module
} from 'vuex-module-decorators'
import { store } from '../index'
import configManager from '../../configManager'

export interface IRootState {
  config: object
}

@Module({ dynamic: true, store, name: 'root', namespaced: true })
export default class Root extends VuexModule implements IRootState {
  config: object = {
    sampleConfig: ''
  }

  @Mutation
  public saveConfig(payload: object) {
    this.config = payload
    configManager.write(payload)
  }

  @Action
  public fetchConfig() {
    return configManager.load().then((config: any) => {
      if (config) {
        const data = JSON.parse(config)
        this.saveConfig(data)
      }
    })
  }
}

export const rootModule = getModule(Root)
