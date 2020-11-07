/* global window, document */

/*
    Responsible for overwriting CSS at runtime according to CC app
    settings as defined by the end user.
*/
import { CSInterface, RGBColor, AppSkinInfo } from 'csinterface-ts'

export default class ThemeManager {
  private csInterface: CSInterface

  private computeValue(value: number, delta?: number): string {
    let computedValue = delta != null ? value + delta : value
    if (computedValue < 0) {
      computedValue = 0
    } else if (computedValue > 255) {
      computedValue = 255
    }

    computedValue = Math.floor(computedValue)

    const computedValueString = computedValue.toString(16)
    return computedValueString.length === 1
      ? '0' + computedValueString
      : computedValueString
  }

  private toHex(color: RGBColor, delta?: number): string {
    let hex = ''
    if (color) {
      hex =
        this.computeValue(color.red, delta) +
        this.computeValue(color.green, delta) +
        this.computeValue(color.blue, delta)
    }
    return hex
  }

  private reverseColor(color: RGBColor, delta: number): string {
    return this.toHex(
      {
        red: Math.abs(255 - color.red),
        green: Math.abs(255 - color.green),
        blue: Math.abs(255 - color.blue),
        alpha: color.alpha,
      },
      delta
    )
  }

  private addRule(stylesheetId: string, selector: string, rule: string): void {
    const stylesheetElement = document.getElementById(stylesheetId)
    let stylesheet
    if (stylesheetElement)
      stylesheet = (stylesheetElement as HTMLStyleElement).sheet

    if (stylesheet) {
      stylesheet = stylesheet as CSSStyleSheet
      if (stylesheet.addRule) {
        stylesheet.addRule(selector, rule)
      } else if (stylesheet.insertRule) {
        stylesheet.insertRule(
          selector + ' { ' + rule + ' }',
          stylesheet.cssRules.length
        )
      }
    }
  }

  /**
   * Update the theme with the AppSkinInfo retrieved from the host product.
   */
  public updateThemeWithAppSkinInfo(appSkinInfo: AppSkinInfo): void {
    const panelBgColor = appSkinInfo.panelBackgroundColor.color as RGBColor
    const bgdColor = this.toHex(panelBgColor)

    const darkBgdColor = this.toHex(panelBgColor, 20)

    let fontColor = 'F0F0F0'
    if (panelBgColor.red > 122) {
      fontColor = '000000'
    }
    const lightBgdColor = this.toHex(panelBgColor, -100)

    const styleId = 'hostStyle'

    this.addRule(styleId, '.hostElt', 'background-color:' + '#' + bgdColor)
    this.addRule(
      styleId,
      '.hostElt',
      'font-size:' + appSkinInfo.baseFontSize + 'px;'
    )
    this.addRule(
      styleId,
      '.hostElt',
      'font-family:' + appSkinInfo.baseFontFamily
    )
    this.addRule(styleId, '.hostElt', 'color:' + '#' + fontColor)

    this.addRule(styleId, '.hostBgd', 'background-color:' + '#' + bgdColor)
    this.addRule(
      styleId,
      '.hostBgdDark',
      'background-color: ' + '#' + darkBgdColor
    )
    this.addRule(
      styleId,
      '.hostBgdLight',
      'background-color: ' + '#' + lightBgdColor
    )
    this.addRule(
      styleId,
      '.hostFontSize',
      'font-size:' + appSkinInfo.baseFontSize + 'px;'
    )
    this.addRule(
      styleId,
      '.hostFontFamily',
      'font-family:' + appSkinInfo.baseFontFamily
    )
    this.addRule(styleId, '.hostFontColor', 'color:' + '#' + fontColor)

    this.addRule(
      styleId,
      '.hostFont',
      'font-size:' + appSkinInfo.baseFontSize + 'px;'
    )
    this.addRule(
      styleId,
      '.hostFont',
      'font-family:' + appSkinInfo.baseFontFamily
    )
    this.addRule(styleId, '.hostFont', 'color:' + '#' + fontColor)

    this.addRule(
      styleId,
      '.hostButton',
      'background-color:' + '#' + darkBgdColor
    )
    this.addRule(
      styleId,
      '.hostButton:hover',
      'background-color:' + '#' + bgdColor
    )
    this.addRule(
      styleId,
      '.hostButton:active',
      'background-color:' + '#' + darkBgdColor
    )
    this.addRule(styleId, '.hostButton', 'border-color: ' + '#' + lightBgdColor)
  }

  public onAppThemeColorChanged = (event: string): void => {
    console.log('onAppThemeColorChanged: ', event)
    const skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment())
      .appSkinInfo
    this.updateThemeWithAppSkinInfo(skinInfo)
  }

  public constructor() {
    this.csInterface = new CSInterface()
  }

  public init() {
    this.updateThemeWithAppSkinInfo(
      this.csInterface.hostEnvironment.appSkinInfo
    )

    this.csInterface.addEventListener(
      this.csInterface.THEME_COLOR_CHANGED_EVENT,
      this.onAppThemeColorChanged
    )
  }
}
