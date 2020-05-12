import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import configManager from '../../libs/configManager'

@Module({ name: 'ConfigStore', namespaced: true })
export default class ConfigStore extends VuexModule {
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
