function jsxAlert(args: any): void {
  var content = args['content']
  alert(content)
}

///////////////////////////////////////////////////////////////////////////////
// File
///////////////////////////////////////////////////////////////////////////////
function recursiveFileDelete(folderObj: Folder): void {
  var files = folderObj.getFiles(null)
  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      if (!files[i].remove()) {
        recursiveFileDelete(files[i] as Folder)
      }
    }
  }
}

function createFolder(folderObj: Folder): boolean {
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

function selectFolder(): Folder | boolean {
  var folderObj = Folder.selectDialog('Select Folder...')

  if (folderObj) {
    return folderObj
  } else {
    return false
  }
}

function getFileList(args: any): string | void {
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

function selectFile(
  dialogText: string,
  fileFilter?: string,
  multipleFlag?: boolean
): File | Folder | boolean {
  var title = dialogText || 'Select File...'
  var fileObj = File.openDialog(title, fileFilter, multipleFlag)
  if (!fileObj) {
    // alert('File was not selected.')
    return false
  } else {
    return fileObj
  }
}

function readFile(args: any): string {
  var path = args['path']
  var fileObj = new File(path)
  fileObj.encoding = 'UTF-8'
  var flag = fileObj.open('r')
  if (flag == true) {
    var content = fileObj.read()
    return content
  }
}

function writeFile(args: any): boolean {
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
