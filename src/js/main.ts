// global $, window, location, CSInterface, SystemPath, themeManager

import App from './App.vue'
import Vue from 'vue'
import { CSInterface, SystemPath } from 'csinterface-ts'
import { store } from './store'
import configManager from './configManager'
import JSXInterface from './jsxInterface'
import ThemeManager from './themeManager'

const jsxInterface = JSXInterface.getInstance()
const csInterface = new CSInterface()
var fs = require('fs')

isNodeJSEnabled()
init()

function isNodeJSEnabled() {
  console.log('Node.js')
  if (typeof require !== 'undefined') {
    console.log(
      'Node.js is enabled: ',
      csInterface.getSystemPath(SystemPath.EXTENSION)
    )
    var list = fs.readdirSync(csInterface.getSystemPath(SystemPath.EXTENSION))
    console.log(list)
  } else {
    console.log('Node.js is none')
    alert('Node.js is disabled')
  }
}

async function init() {
  new ThemeManager()

  // Sample Events
  csInterface.addEventListener(
    'documentAfterActivate',
    () => {
      console.log('CEP Application Events: documentAfterActivate')
    },
    null
  )
  csInterface.addEventListener(
    'documentAfterDeactivate',
    () => {
      console.log('CEP Application Events: documentAfterDeactivate')
    },
    null
  )

  jsxInterface.registerInclude('/js/libs/json2.js')
  jsxInterface.registerInclude('/js/libs/polyfill.js')
  jsxInterface.registerInclude('/jsx/hostscript.jsx')

  // Config
  const config = await configManager.load()
  if (config !== JSXInterface.NO_RETURN) {
    console.log('loadConfig Content: ', config)
  } else {
    console.log('no config', config)
    configManager.write({ version: '0.0.1' })
  }

  /* eslint-disable no-new */
  new Vue({
    components: { App },
    template: '<App/>',
    store
  }).$mount('#app')

  $('#btn_reload').click(function () {
    window.location.reload()
  })

  $('#btn_close').click(function () {
    csInterface.closeExtension()
  })

  $('#btn_hello').click(function () {
    jsxInterface.evaluateJSX('jsxAlert', { content: 'hello' })
  })
}
