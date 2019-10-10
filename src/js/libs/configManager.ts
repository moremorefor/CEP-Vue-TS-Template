import * as fs from 'fs-extra'
import JSXInterface from './jsxInterface'
import cepUtils from './cepUtils'
const jsxInterface = JSXInterface.getInstance()

class ConfigManager {
  private _dataPath: string
  private _filePath: string

  public constructor() {
    console.log('cepUtils.getRootPath(): ', cepUtils.getRootPath())
    console.log('cepUtils.getDataPath(): ', cepUtils.getDataPath())
    console.log('cepUtils.getAppName(): ', cepUtils.getApplicationName())
    this._dataPath = cepUtils.getDataPath()
    this.createDataDirectory(this._dataPath)
    this._filePath =
      cepUtils.getDataPath() + '/' + cepUtils.getApplicationName() + '.json'
  }

  public createDataDirectory(dataPath: string): void {
    fs.mkdirsSync(dataPath)
  }

  public filePath(): string {
    return this._filePath
  }

  public load(): Promise<void | object> {
    return jsxInterface.evaluateJSX('readFile', { path: this._filePath })
  }

  public write(payload: object): Promise<void | object> {
    const json = JSON.stringify(payload, null, '\t')
    const args = { path: this._filePath, content: json }

    return jsxInterface.evaluateJSX('writeFile', args)
  }
}

const instance = new ConfigManager()
Object.freeze(instance)

export default instance
