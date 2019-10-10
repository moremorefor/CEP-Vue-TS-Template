// global $, window, location, CSInterface, SystemPath, themeManager

import App from './App.vue'
import Vue from 'vue'
import { CSInterface, SystemPath } from 'csinterface-ts'
import * as fs from 'fs'
import { store } from './store'
import cepUtils from './libs/cepUtils'
import configManager from './libs/configManager'
import JSXInterface from './libs/jsxInterface'
import ThemeManager from './libs/themeManager'

const jsxInterface = JSXInterface.getInstance()
const csInterface = new CSInterface()

function isNodeJSEnabled(): void {
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

async function init(): Promise<any> {
  new ThemeManager()

  // Sample Events
  csInterface.addEventListener(
    'documentAfterActivate',
    (): void => {
      console.log('CEP Application Events: documentAfterActivate')
    },
    null
  )
  csInterface.addEventListener(
    'documentAfterDeactivate',
    (): void => {
      console.log('CEP Application Events: documentAfterDeactivate')
    },
    null
  )

  // Include jsx
  jsxInterface.registerInclude('/node_modules/extendscript-es5-shim/index.js')
  jsxInterface.registerInclude('/jsx/libs/json2.js')
  jsxInterface.registerInclude('/jsx/hostscript.jsx')
  if (cepUtils.getApplicationName() == 'Photoshop')
    jsxInterface.registerInclude('/jsx/Photoshop.jsx')
  if (cepUtils.getApplicationName() == 'Illustrator')
    jsxInterface.registerInclude('/jsx/Illustrator.jsx')

  // Config
  const config = await configManager.load()
  if (config) {
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

  $('#btn_reload').click((): void => {
    window.location.reload()
  })

  $('#btn_close').click((): void => {
    csInterface.closeExtension()
  })

  $('#btn_hello').click((): void => {
    jsxInterface.evaluateJSX('jsxAlert', { content: 'hello' })
  })
}

isNodeJSEnabled()
init()
