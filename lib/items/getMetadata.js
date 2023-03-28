const got = require("got");
const gotConfig = require("../helpers/gotHelper");
const userPathGenerator = require("../helpers/pathHelper");
const {axiosInstance} = require("../helpers/gotHelper");

/**
 * @function getMetadata
 * @description Get items metadata (file or folder)
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId Item id
 *
 * @return {Promise<Object>} Item's metadata
 */
async function getMetadata(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }

  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + "items/" + params.itemId;

  const response = await axiosInstance.request({
    url: URI,
    method: "GET",
    accessToken: params.accessToken
  })

  return response.data;
}

module.exports = getMetadata;
