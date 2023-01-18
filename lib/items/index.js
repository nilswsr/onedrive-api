// lib/items/index.js

import listChildren from "./listChildren.js"
import createFolder from "./createFolder.js"
import uploadSimple from "./uploadSimple.js"
import uploadSession from "./uploadSession.js"
import update from "./update.js"
import getMetadata from "./getMetadata.js"
import download from "./download.js"
import partialDownload from "./partialDownload.js"
import sync from "./sync.js"
import  customEndpoint from "./customEndpoint.js"
import _delete from "./delete.js"

export default {
  listChildren: listChildren,
  createFolder: createFolder,
  uploadSimple: uploadSimple,
  uploadSession: uploadSession,
  update: update,
  getMetadata: getMetadata,
  download: download,
  partialDownload: partialDownload,
  sync: sync,
  customEndpoint: customEndpoint,
  delete: _delete,
}
