function jsxAlert(args: any): void {
  const content = args['content']
  alert(content)
}

///////////////////////////////////////////////////////////////////////////////
// File
///////////////////////////////////////////////////////////////////////////////
function recursiveFileDelete(folderObj: Folder): void {
  const files = folderObj.getFiles(null)
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      if (!files[i].remove()) {
        recursiveFileDelete(files[i] as Folder)
      }
    }
  }
}

function createFolder(folderObj: Folder): boolean {
  let result
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
  const folderObj = Folder.selectDialog('Select Folder...')

  if (folderObj) {
    return folderObj
  } else {
    return false
  }
}

function getFileList(args: any): string | void {
  const folderPath = args['folderPath']
  const folderObj = new Folder(folderPath)
  const files = folderObj.getFiles(args['ext'])
  const filepaths = []
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      filepaths.push(files[i].fsName)
    }
    const obj = { folderPath: folderPath, filepaths: filepaths }
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
  const title = dialogText || 'Select File...'
  const fileObj = File.openDialog(title, fileFilter, multipleFlag)
  if (!fileObj) {
    // alert('File was not selected.')
    return false
  } else {
    return fileObj
  }
}

function readFile(args: any): string {
  const path = args['path']
  const fileObj = new File(path)
  fileObj.encoding = 'UTF-8'
  const flag = fileObj.open('r')
  if (flag == true) {
    const content = fileObj.read()
    return content
  }
}

function writeFile(args: any): boolean {
  const path = args['path']
  const txt = args['content']

  const fileObj = new File(path)
  fileObj.encoding = 'UTF-8'

  // overwrite
  const flag = fileObj.open('w')
  if (flag === true) {
    const text = txt
    fileObj.writeln(text)
    fileObj.close()
    return true
  } else {
    alert("Error: can't create file.")
  }
  return false
}
