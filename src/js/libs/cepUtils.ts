import { CSInterface, SystemPath } from 'csinterface-ts'

class CEPUtils {
  private _csInterface: CSInterface
  private _appName: string
  private _rootPath: string

  public constructor() {
    this._csInterface = new CSInterface()
    this._appName = this.detectApplicationName()
    this._rootPath = this._csInterface.getSystemPath(SystemPath.EXTENSION)
  }

  public getApplicationName(): string {
    return this._appName
  }

  public getRootPath(): string {
    return this._rootPath
  }

  public getDataPath(): string {
    const extensionPathArr = this._csInterface
      .getSystemPath(SystemPath.EXTENSION)
      .split('/')
    const extensionName = extensionPathArr[extensionPathArr.length - 1]
    const dataPath = this._csInterface.getSystemPath(SystemPath.USER_DATA)
    var OSVersion = this._csInterface.getOSInformation()
    let savePath
    if (OSVersion.indexOf('Windows') >= 0) {
      savePath = dataPath.replace('Roaming', 'LocalLow')
    } else {
      savePath = dataPath
    }
    return savePath + '/Adobe/CEP/extensions/' + extensionName
  }

  private detectApplicationName(): string {
    const appID = this._csInterface.getApplicationID()
    console.log('Application: ', appID)
    switch (appID) {
      case 'PHXS':
        return 'Photoshop'
      case 'PHSP':
        return 'Photoshop'
      case 'ILST':
        return 'Illustrator'
      default:
        return 'Other'
    }
  }
}

const instance = new CEPUtils()
Object.freeze(instance)

export default instance
