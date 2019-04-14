/*eslint-disable */
preferences.rulerUnits = Units.PIXELS

function jsxAlert(args) {
  var content = args['content']
  alert(content)
}

function historyCall(args) {
  var func = args['func']
  var params = args['params']
  try {
    activeDocument
  } catch (e) {
    alert(
      'Active document not found.\nsuspendHistory is active document required.'
    )
  }

  if (params) {
    activeDocument.suspendHistory(func, func + '(params)')
  } else {
    activeDocument.suspendHistory(func, func + '()')
  }
}

///////////////////////////////////////////////////////////////////////////////
// File
///////////////////////////////////////////////////////////////////////////////
function createFolder(folderObj) {
  var result
  if (!folderObj.exists) {
    result = folderObj.create()
    if (!result) {
      alert("Error: can't create file.")
      return false
    }
  } else {
    recursiveFileDelete(folderObj)
  }

  return true
}

function selectFolder() {
  var folderObj = Folder.selectDialog('Select Folder...')

  if (folderObj) {
    return folderObj
  } else {
    return false
  }
}

function recursiveFileDelete(folderObj) {
  var files = folderObj.getFiles()
  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      if (!files[i].remove()) {
        recursiveFileDelete(files[i])
      }
    }
  }
}

function getFileList(args) {
  var folderPath = args['folderPath']
  var folderObj = new Folder(folderPath)
  var files = folderObj.getFiles(args['ext'])
  var filepaths = []
  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      filepaths.push(files[i].fsName)
    }
    var obj = { folderPath: folderPath, filepaths: filepaths }
    return JSON.stringify(obj)
  } else {
    // alert("jsx file not found.");
  }
}

function selectFile(dialogText, fileFilter, multipleFlag) {
  var title = dialogText || 'Select File...'
  var fileObj = File.openDialog(title, fileFilter, multipleFlag)
  if (!fileObj) {
    // alert('File was not selected.')
    return false
  } else {
    return fileObj
  }
}

function readFile(args) {
  var path = args['path']
  var fileObj = new File(path)
  fileObj.encoding = 'UTF-8'
  var flag = fileObj.open('r')
  if (flag == true) {
    var content = fileObj.read()
    return content
  }
}

function writeFile(args) {
  var path = args['path']
  var txt = args['content']

  var fileObj = new File(path)
  fileObj.encoding = 'UTF-8'

  // overwrite
  flag = fileObj.open('w')
  if (flag === true) {
    var text = txt
    fileObj.writeln(text)
    fileObj.close()
    return true
  } else {
    alert("Error: can't create file.")
  }
  return false
}

///////////////////////////////////////////////////////////////////////////////
// Layer Utils
///////////////////////////////////////////////////////////////////////////////
function getLayerReference(index) {
  var idTrnf = charIDToTypeID('Trnf')
  var desc48 = new ActionDescriptor()
  var idnull = charIDToTypeID('null')
  var ref36 = new ActionReference()
  var idLyr = charIDToTypeID('Lyr ')
  var idOrdn = charIDToTypeID('Ordn')
  var idTrgt = charIDToTypeID('Trgt')
  ref36.putEnumerated(idLyr, idOrdn, idTrgt)
  desc48.putReference(idnull, ref36)
}

function getSelectedLayersIdx() {
  var selectedLayers = new Array()
  var ref = new ActionReference()
  ref.putEnumerated(
    charIDToTypeID('Dcmn'),
    charIDToTypeID('Ordn'),
    charIDToTypeID('Trgt')
  )
  var desc = executeActionGet(ref)
  if (desc.hasKey(stringIDToTypeID('targetLayers'))) {
    desc = desc.getList(stringIDToTypeID('targetLayers'))
    var c = desc.count
    var selectedLayers = new Array()
    for (var i = c - 1; i >= 0; i--) {
      try {
        activeDocument.backgroundLayer
        selectedLayers.push(desc.getReference(i).getIndex())
      } catch (e) {
        selectedLayers.push(desc.getReference(i).getIndex() + 1)
      }
    }
  } else {
    var ref = new ActionReference()
    ref.putProperty(charIDToTypeID('Prpr'), charIDToTypeID('ItmI'))
    ref.putEnumerated(
      charIDToTypeID('Lyr '),
      charIDToTypeID('Ordn'),
      charIDToTypeID('Trgt')
    )
    try {
      activeDocument.backgroundLayer
      selectedLayers.push(
        executeActionGet(ref).getInteger(charIDToTypeID('ItmI')) - 1
      )
    } catch (e) {
      selectedLayers.push(
        executeActionGet(ref).getInteger(charIDToTypeID('ItmI'))
      )
    }
    var vis = app.activeDocument.activeLayer.visible
    if (vis == true) app.activeDocument.activeLayer.visible = false
    var desc9 = new ActionDescriptor()
    var list9 = new ActionList()
    var ref9 = new ActionReference()
    ref9.putEnumerated(
      charIDToTypeID('Lyr '),
      charIDToTypeID('Ordn'),
      charIDToTypeID('Trgt')
    )
    list9.putReference(ref9)
    desc9.putList(charIDToTypeID('null'), list9)
    executeAction(charIDToTypeID('Shw '), desc9, DialogModes.NO)
    if (app.activeDocument.activeLayer.visible == false) selectedLayers.shift()
    app.activeDocument.activeLayer.visible = vis
  }
  return selectedLayers
}
