app.preferences.rulerUnits = Units.PIXELS

function historyCall(args: any): void {
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
