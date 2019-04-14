import * as fs from 'fs-extra'
import JSXInterface from './jsxinterface'
import cepUtils from './cepUtils'
const jsxInterface = JSXInterface.getInstance()

class ConfigManager {
  _dataPath: string
  _filePath: string

  constructor() {
    console.log('cepUtils.getRootPath(): ', cepUtils.getRootPath())
    console.log('cepUtils.getDataPath(): ', cepUtils.getDataPath())
    console.log('cepUtils.getAppName(): ', cepUtils.getAppName())
    this._dataPath = cepUtils.getDataPath()
    this.createDataDirectory(this._dataPath)
    this._filePath =
      cepUtils.getDataPath() + '/' + cepUtils.getAppName() + '.json'
  }

  createDataDirectory(dataPath: string) {
    fs.mkdirsSync(dataPath)
  }

  filePath() {
    return this._filePath
  }

  load() {
    return jsxInterface.evaluateJSX('readFile', { path: this._filePath })
  }

  write(payload: object) {
    const json = JSON.stringify(payload, null, '\t')
    const args = { path: this._filePath, content: json }

    return jsxInterface.evaluateJSX('writeFile', args)
  }
}

const instance = new ConfigManager()
Object.freeze(instance)

export default instance
