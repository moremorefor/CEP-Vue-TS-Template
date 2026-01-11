<template>
  <div id="app">
    <Buttons />
    <Config :config="config" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useConfigStore } from './store/config'
import Buttons from './commponents/Buttons.vue'
import Config from './commponents/Config.vue'

const store = useConfigStore()
const config = computed(() => store.config)

onMounted(() => {
  store.fetchConfig().then(() => {
    console.log('root/fetchConfig')
  })
})
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
