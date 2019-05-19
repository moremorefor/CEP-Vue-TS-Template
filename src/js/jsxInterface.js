import cepUtils from './cepUtils'

let instance

function JSXInterface() {
  this.csInterface = new CSInterface()
}

JSXInterface.NO_RETURN = ''

JSXInterface.getInstance = function() {
  if (!instance) {
    instance = new JSXInterface()
  }
  return instance
}

JSXInterface.prototype._sendJSXString = function(f, args) {
  var self = this
  console.log('【DEBUG】_sendJSXString: ', f, args)

  return new Promise(function(resolve, reject) {
    self.csInterface.evalScript(f + '(' + args + ')', function(res) {
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

JSXInterface.prototype._sendJSX = function(f, params) {
  var self = this

  // console.log('【DEBUG】params: ', params)
  var paramsString = JSON.stringify(params)
  // console.log('【DEBUG】paramsString: ', paramsString)
  return new Promise(function(resolve, reject) {
    self
      ._sendJSXString(f, paramsString)
      .then(function(res) {
        console.log('res: ', res)
        resolve(res)
      })
      .catch(function(e) {
        reject(e)
      })
  })
}

JSXInterface.prototype.evaluateJSX = function(f, params) {
  var self = this
  return self._sendJSX(f, params)
}

JSXInterface.prototype.alert = function(message) {
  var self = this
  console.log(message)
  self.evaluateJSX('jsxAlert', { message: message }).then(function(cb) {})
}

JSXInterface.prototype.registerInclude = function(filepath) {
  const filePath = cepUtils.getRootPath() + filepath
  console.log('registerInclude: ', filePath)
  this.csInterface.evalScript('$.evalFile("' + filePath + '")')
}

export default JSXInterface
