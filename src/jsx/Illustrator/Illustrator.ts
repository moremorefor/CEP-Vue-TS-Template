/// <reference types="../@types/Illustrator/2015.3"/>

function createNewDocument(): Document {
  return app.documents.add(DocumentColorSpace.RGB)
}
