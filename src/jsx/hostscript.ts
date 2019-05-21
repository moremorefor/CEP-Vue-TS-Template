/// <reference types="./@types/Photoshop/2015.5"/>
app.preferences.rulerUnits = Units.PIXELS

function jsxAlert(args: any) {
  var content = args['content']
  alert(content)
}

function historyCall(args: any) {
  var func = args['func']
  var params = args['params']
  try {
    app.activeDocument
  } catch (e) {
    alert(
      'Active document not found.\nsuspendHistory is active document required.'
    )
  }

  if (params) {
    app.activeDocument.suspendHistory(func, func + '(params)')
  } else {
    app.activeDocument.suspendHistory(func, func + '()')
  }
}

///////////////////////////////////////////////////////////////////////////////
// File
///////////////////////////////////////////////////////////////////////////////
function createFolder(folderObj: Folder) {
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

function recursiveFileDelete(folderObj: Folder) {
  var files = folderObj.getFiles(null)
  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      if (!files[i].remove()) {
        recursiveFileDelete(files[i] as Folder)
      }
    }
  }
}

function getFileList(args: any) {
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

function selectFile(dialogText: string, fileFilter?: string, multipleFlag?: boolean) {
  var title = dialogText || 'Select File...'
  var fileObj = File.openDialog(title, fileFilter, multipleFlag)
  if (!fileObj) {
    // alert('File was not selected.')
    return false
  } else {
    return fileObj
  }
}

function readFile(args: any) {
  var path = args['path']
  var fileObj = new File(path)
  fileObj.encoding = 'UTF-8'
  var flag = fileObj.open('r')
  if (flag == true) {
    var content = fileObj.read()
    return content
  }
}

function writeFile(args: any) {
  var path = args['path']
  var txt = args['content']

  var fileObj = new File(path)
  fileObj.encoding = 'UTF-8'

  // overwrite
  var flag = fileObj.open('w')
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
function getLayerReference(index: number) {
  var idTrnf = app.charIDToTypeID('Trnf')
  var desc48 = new ActionDescriptor()
  var idnull = app.charIDToTypeID('null')
  var ref36 = new ActionReference()
  var idLyr = app.charIDToTypeID('Lyr ')
  var idOrdn = app.charIDToTypeID('Ordn')
  var idTrgt = app.charIDToTypeID('Trgt')
  ref36.putEnumerated(idLyr, idOrdn, idTrgt)
  desc48.putReference(idnull, ref36)
}

function getSelectedLayersIdx() {
  var selectedLayers = []
  var ref = new ActionReference()
  ref.putEnumerated(
    app.charIDToTypeID('Dcmn'),
    app.charIDToTypeID('Ordn'),
    app.charIDToTypeID('Trgt')
  )
  var desc = app.executeActionGet(ref)
  if (desc.hasKey(app.stringIDToTypeID('targetLayers'))) {
    var descList = desc.getList(app.stringIDToTypeID('targetLayers'))
    var c = descList.count
    var selectedLayers = []
    for (var i = c - 1; i >= 0; i--) {
      try {
        app.activeDocument.backgroundLayer
        selectedLayers.push(descList.getReference(i).getIndex())
      } catch (e) {
        selectedLayers.push(descList.getReference(i).getIndex() + 1)
      }
    }
  } else {
    var ref = new ActionReference()
    ref.putProperty(app.charIDToTypeID('Prpr'), app.charIDToTypeID('ItmI'))
    ref.putEnumerated(
      app.charIDToTypeID('Lyr '),
      app.charIDToTypeID('Ordn'),
      app.charIDToTypeID('Trgt')
    )
    try {
      app.activeDocument.backgroundLayer
      selectedLayers.push(
        app.executeActionGet(ref).getInteger(app.charIDToTypeID('ItmI')) - 1
      )
    } catch (e) {
      selectedLayers.push(
        app.executeActionGet(ref).getInteger(app.charIDToTypeID('ItmI'))
      )
    }
    var vis = app.activeDocument.activeLayer.visible
    if (vis == true) app.activeDocument.activeLayer.visible = false
    var desc9 = new ActionDescriptor()
    var list9 = new ActionList()
    var ref9 = new ActionReference()
    ref9.putEnumerated(
      app.charIDToTypeID('Lyr '),
      app.charIDToTypeID('Ordn'),
      app.charIDToTypeID('Trgt')
    )
    list9.putReference(ref9)
    desc9.putList(app.charIDToTypeID('null'), list9)
    app.executeAction(app.charIDToTypeID('Shw '), desc9, DialogModes.NO)
    if (app.activeDocument.activeLayer.visible == false) selectedLayers.shift()
    app.activeDocument.activeLayer.visible = vis
  }
  return selectedLayers
}
