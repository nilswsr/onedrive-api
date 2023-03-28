// download.js
const got = require("got");
const userPathGenerator = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");
const {axiosInstance} = require("../helpers/gotHelper");

/**
 * @function download
 * @description Download item content
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId item id
 * @param {String} params.format converts item to specified format
 *
 * @return {ReadableStream} Readable stream with item's content
 */
function download(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }

  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + "items/" + params.itemId + "/content" + (params.format ? `?format=${params.format}` : "");

  async function sendRequest() {
    return axiosInstance.request({
      url: URI,
      method: "GET",
      accessToken: params.accessToken,
      responseType: "stream"
    }).then(response => {
      return response.data
    })
  }

  return sendRequest().then(res => res);
}

module.exports = download;
