<template lang="html">
  <div>
    <h4 class="headline">Title</h4>

    <div class="wrapper">
      <button class="topcoat-button--cta" @click="helloAlert">
        HelloWorld
      </button>
      <button class="topcoat-button--cta" @click="helloHistoryCall">
        SuspendHistory version
      </button>
    </div>

    <div class="space"></div>

    <div class="line"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import JSXInterface from '../jsxInterface'
const jsxInterface = JSXInterface.getInstance()

@Component
export default class Buttons extends Vue {
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
