<template lang="html">
  <div>
    <h4 class="headline">Common</h4>
    <div class="wrapper">
      <button class="topcoat-button--cta" @click="helloAlert">
        HelloWorld
      </button>
    </div>

    <div v-if="applicationName == 'Photoshop'">
      <h4 class="headline">Photoshop</h4>
      <div class="wrapper">
        <button class="topcoat-button--cta" @click="helloHistoryCall">
          SuspendHistory - HelloWorld
        </button>
      </div>
    </div>

    <div v-if="applicationName == 'Illustrator'">
      <h4 class="headline">Illustrator</h4>
      <div class="wrapper">
        <button class="topcoat-button--cta" @click="createNewDocument">
          Create document
        </button>
      </div>
    </div>

    <div class="space"></div>

    <div class="line"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import cepUtils from '../libs/cepUtils'
import JSXInterface from '../libs/jsxInterface'
const jsxInterface = JSXInterface.getInstance()

@Component
export default class Buttons extends Vue {
  applicationName: string = ''

  created() {
    this.applicationName = cepUtils.getApplicationName()
  }

  helloAlert() {
    jsxInterface.evaluateJSX('jsxAlert', {
      content: 'Hello World'
    })
  }

  helloHistoryCall() {
    jsxInterface.evaluateJSX('historyCall', {
      func: 'jsxAlert',
      params: {
        content: 'Hello World'
      }
    })
  }

  createNewDocument() {
    jsxInterface.evaluateJSX('createNewDocument', {
      content: 'Hello World'
    })
  }
}
</script>

<style lang="sass" scoped>
.wrapper
  display: flex
  flex-wrap: wrap
  margin: 0 0 1em 0
  button
    margin: 0 1em 0.7em 0
    font-weight: bold
.headline
  font-size: 0.8em
  text-align: left
  margin-bottom: 0.8em
.space
  content: ""
  height: 10px
.line
  width: 100%
  height: 1px
  background: #aaa
  margin: 5px 0 10px 0
</style>
