<template>
  <div id="app">
    <Buttons />
    <Config :config="config" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { configModule } from './store'
import Buttons from './commponents/Buttons.vue'
import Config from './commponents/Config.vue'

@Component({
  components: {
    Buttons,
    Config,
  },
})
export default class App extends Vue {
  get config() {
    return configModule.config
  }

  created() {
    configModule.fetchConfig().then(() => {
      console.log('root/fetchConfig')
    })
  }
}
</script>

<style lang="scss" scoped>
#app {
  margin-top: 20px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
