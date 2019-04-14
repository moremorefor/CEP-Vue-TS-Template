const fs = require('fs')
const config = require('./config.json')
console.log(config)

// index.html
const htmlData = fs.readFileSync('./setup/template/index_template.html', 'utf8')
const htmlResult = htmlData.replace(/{{name}}/g, config.name)
fs.writeFileSync('./src/index.html', htmlResult)

// manifest.xml
const manifestData = fs.readFileSync(
  './setup/template/manifest_template.xml',
  'utf8'
)
var manifestResult = manifestData.replace(/{{name}}/g, config.name)
manifestResult = manifestResult.replace(/{{bundleId}}/g, config.bundleId)
fs.writeFileSync('./src/CSXS/manifest.xml', manifestResult)

// .debug
const debugData = fs.readFileSync('./setup/template/debug_template', 'utf8')
var debugResult = debugData.replace(/{{bundleId}}/g, config.bundleId)
debugResult = debugResult.replace(/{{debugPort}}/g, config.debugPort)
fs.writeFileSync('./src/.debug', debugResult)
