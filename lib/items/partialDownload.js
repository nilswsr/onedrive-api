// partialDownload.js
const getMetadata = require("./getMetadata");
const got = require("got");
const gotConfig = require("../helpers/gotHelper");
const {axiosInstance} = require("../helpers/gotHelper");

/**
 * @function partialDownload
 * @description partially download item content
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.graphDownloadURL The URL string from `@microsoft.graph.downloadUrl`
 * @param {String} params.itemId item id. If `graphDownloadURL` is provided, this parameter will be ignored
 * @param {Number} params.bytesFrom the starting byte to stream
 * @param {Number} params.bytesTo the ending byte of the stream
 *
 * @return {Promise<NodeJS.ReadableStream>} A promise with the result is a `Readable stream` with partial item's content
 */

async function partialDownload(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.graphDownloadURL && !params.itemId) {
    throw new Error("Missing both params.graphDownloadURL and params.itemId");
  }

  if (!params.bytesFrom) {
    params.bytesFrom = 0;
  }

  if (!params.bytesTo) {
    throw new Error("Missing params.bytesTo");
  }

  let URI = params.graphDownloadURL;
  if (!URI) {
    const metaItem = await getMetadata(params);
    URI = metaItem["@microsoft.graph.downloadUrl"];
    if (!URI) {
      throw new Error("Item does not have @microsoft.graph.downloadUrl field");
    }
  }

  const response = await axiosInstance.request({
    url: URI,
    method: "GET",
    accessToken: params.accessToken,
    responseType: "arraybuffer",
    headers: {
      ...axiosInstance.defaults.headers,
      Range: `bytes=${params.bytesFrom}-${params.bytesTo}`
    }
  })

  return response.data;
}

module.exports = partialDownload;
