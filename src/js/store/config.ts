import { defineStore } from 'pinia'
import configManager from '../libs/configManager'

export const useConfigStore = defineStore('config', {
    state: () => ({
        config: {
            sampleConfig: '',
        },
    }),
    actions: {
        saveConfig(payload: any) {
            this.config = payload
            configManager.write(payload)
        },
        async fetchConfig() {
            const config = await configManager.load()
            if (config) {
                this.saveConfig(config)
            }
        },
    },
})
