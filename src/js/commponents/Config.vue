<template>
  <div>
    <h4 class="headline">Config save sample</h4>
    <div class="input">
      <input
        ref="sampleConfigInput"
        class="topcoat-text-input"
        placeholder="SampleConfig"
        :value="config.sampleConfig"
      />
      <button class="topcoat-button" @click="saveSampleConfig">Save</button>
    </div>

    <blockquote class="printData">
      {{ printData }}
    </blockquote>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { configModule } from '../store'

@Component
export default class Config extends Vue {
  @Prop({ type: Object })
  config!: object

  get printData() {
    return JSON.stringify(this.config, null, '    ')
  }

  saveSampleConfig() {
    const el = this.$refs.sampleConfigInput as HTMLInputElement
    const newData = {
      ...this.config,
      sampleConfig: el.value,
    }
    configModule.saveConfig(newData)
  }
}
</script>

<style lang="scss" scoped>
.headline {
  margin-bottom: 0.8em;
  font-size: 0.8em;
  text-align: left;
}

.input {
  display: flex;
  margin-bottom: 1rem;

  & input {
    width: 80%;
  }
}

.printData {
  font-size: 0.85rem;
  text-align: left;
}
</style>
