import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module,
} from 'vuex-module-decorators'
import { store } from '../index'
import configManager from '../../libs/configManager'

export interface RootState {
  config: object
}

@Module({ dynamic: true, store, name: 'root', namespaced: true })
export default class Root extends VuexModule implements RootState {
  public config: object = {
    sampleConfig: '',
  }

  @Mutation
  public saveConfig(payload: object): void {
    this.config = payload
    configManager.write(payload)
  }

  @Action
  public fetchConfig(): Promise<void | object> {
    return configManager.load().then((config: void | object): void => {
      if (config) {
        this.saveConfig(config)
      }
    })
  }
}

export const rootModule = getModule(Root)
