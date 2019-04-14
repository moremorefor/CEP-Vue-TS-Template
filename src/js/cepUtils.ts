class CEPUtils {
  _csInterface: any
  _appName: string
  _rootPath: string
  constructor() {
    this._csInterface = new CSInterface()
    this._appName = this.getApplicationName()
    this._rootPath = this._csInterface.getSystemPath(SystemPath.EXTENSION)
  }

  getAppName() {
    return this._appName
  }

  getRootPath() {
    return this._rootPath
  }

  getDataPath() {
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

  getApplicationName() {
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
