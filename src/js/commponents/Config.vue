<template>
  <div>
    <h4 class="headline">Config save sample</h4>
    <div class="input">
      <input
        ref="sampleConfigInput"
        :value="config.sampleConfig"
        class="topcoat-text-input"
        placeholder="SampleConfig"
      />
      <button class="topcoat-button" @click="saveSampleConfig">Save</button>
    </div>

    <blockquote class="printData">{{ printData }}</blockquote>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { rootModule } from '../store/modules/root'

@Component
export default class Config extends Vue {
  @Prop({ type: Object })
  config = {
    sampleConfig: ''
  }

  get printData() {
    return JSON.stringify(this.config, null, '    ')
  }

  saveSampleConfig() {
    var el = this.$refs.sampleConfigInput as HTMLInputElement
    const newData = {
      ...this.config,
      sampleConfig: el.value
    }
    rootModule.saveConfig(newData)
  }
}
</script>

<style lang="sass" scoped>
.headline
  font-size: 0.8em
  text-align: left
  margin-bottom: 0.8em

.input
  display: flex
  margin-bottom: 1rem
  input
    width: 80%

.printData
  font-size: 0.85rem
  text-align: left
</style>
