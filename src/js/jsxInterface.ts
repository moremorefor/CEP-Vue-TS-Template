import cepUtils from './cepUtils'
import { CSInterface } from 'csinterface-ts'

export default class JSXInterface {
  private static _instance: JSXInterface
  private csInterface: CSInterface

  public static readonly NO_RETURN: string = ''

  public static getInstance(): JSXInterface {
    if (!this._instance) this._instance = new JSXInterface()

    return this._instance
  }

  constructor() {
    this.csInterface = new CSInterface()
  }

  private _sendJSXString(f: string, args: string) {
    const self = this
    console.log('【DEBUG】_sendJSXString: ', f, args)

    return new Promise(function(resolve, reject) {
      self.csInterface.evalScript(f + '(' + args + ')', (res: string) => {
        console.log('【DEBUG】csInterface response: ', res)
        // If return; from jsx, returning 'undefined'
        if (res == 'EvalScript error.') {
          reject(res)
        } else if (res !== 'undefined' && res !== 'false') {
          resolve(res)
        } else {
          resolve(JSXInterface.NO_RETURN)
        }
      })
    })
  }

  private _sendJSX(f: string, params: object) {
    const self = this
    const paramsString = JSON.stringify(params)

    return new Promise(function(resolve, reject) {
      self
        ._sendJSXString(f, paramsString)
        .then(function(res: any) {
          console.log('res: ', res)
          resolve(res)
        })
        .catch(function(e: any) {
          reject(e)
        })
    })
  }

  public evaluateJSX(f: string, params: object) {
    return this._sendJSX(f, params)
  }

  public alert(message: string) {
    console.log(message)
    this.evaluateJSX('jsxAlert', { message: message })
  }

  public registerInclude(filepath: string) {
    const filePath = cepUtils.getRootPath() + filepath
    console.log('registerInclude: ', filePath)
    this.csInterface.evalScript(
      '$.evalFile("' + filePath + '")',
      (result: any) => {}
    )
  }
}
