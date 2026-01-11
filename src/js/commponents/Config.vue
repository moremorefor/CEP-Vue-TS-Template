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

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useConfigStore } from '../store/config'

const store = useConfigStore()
const props = defineProps<{
  config: any
}>()

const sampleConfigInput = ref<HTMLInputElement | null>(null)

const printData = computed(() => {
  return JSON.stringify(props.config, null, '    ')
})

const saveSampleConfig = () => {
  if (!sampleConfigInput.value) return
  const newData = {
    ...props.config,
    sampleConfig: sampleConfigInput.value.value,
  }
  store.saveConfig(newData)
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
