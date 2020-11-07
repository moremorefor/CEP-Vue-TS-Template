import * as fs from 'fs'
import { CSInterface } from 'csinterface-ts'
import cepUtils from './cepUtils'

export default class JSXInterface {
  private static _instance: JSXInterface
  private csInterface: CSInterface

  public static readonly NO_RETURN: string = ''

  public static getInstance(): JSXInterface {
    if (!this._instance) this._instance = new JSXInterface()

    return this._instance
  }

  public constructor() {
    this.csInterface = new CSInterface()
  }

  private _sendJSXString(f: string, args: string): Promise<void | object> {
    console.log('【DEBUG】_sendJSXString: ', f, args)

    return new Promise((resolve, reject) => {
      this.csInterface.evalScript(f + '(' + args + ')', (res: string): void => {
        console.log('【DEBUG】csInterface response: ', res)
        // If return; from jsx, returning 'undefined'
        if (res === 'EvalScript error.') {
          reject(res)
        } else if (res !== 'undefined' && res !== 'false') {
          resolve(JSON.parse(res))
        } else {
          resolve()
        }
      })
    })
  }

  private _sendJSX(f: string, params?: object): Promise<void | object> {
    let paramsObj = params
    if (!paramsObj) paramsObj = {}
    const paramsString = JSON.stringify(paramsObj)

    return new Promise((resolve, reject) => {
      this._sendJSXString(f, paramsString)
        .then(function (res: void | object): void {
          console.log('res: ', res)
          resolve(res)
        })
        .catch(function (e: void | object): void {
          reject(e)
        })
    })
  }

  public evaluateJSX(f: string, params?: object): Promise<void | object> {
    return this._sendJSX(f, params)
  }

  public alert(message: string): void {
    console.log(message)
    this.evaluateJSX('jsxAlert', { message })
  }

  public registerInclude(filepath: string): void {
    const filePath = cepUtils.getRootPath() + filepath
    if (!this.isExistFile(filePath)) {
      console.error('registerInclude result: file not found.\n', filePath)
      return
    }
    console.log('registerInclude: ', filePath)
    this.csInterface.evalScript(
      '$.evalFile("' + filePath + '")',
      (result: any): void => {
        console.log('registerInclude result: ', result, '\n', filePath)
      }
    )
  }

  private isExistFile(filepath: string): boolean {
    try {
      fs.statSync(filepath)
      return true
    } catch (err) {
      return false
    }
  }
}
