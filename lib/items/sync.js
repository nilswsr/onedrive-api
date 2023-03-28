const got = require("got");
const userPathGenerator = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");
const {axiosInstance} = require("../helpers/gotHelper");

/**
 * @function sync
 * @description Sync
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} [params.next] nextLink (or deltaLink returned from last session).
 *
 * @return {Promise<Object>} Array of changes since last sync. Use nextLink until deltaLink comes up.
 */
async function sync(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  const userPath = userPathGenerator(params);
  const URI = params.next ? params.next : appConfig.apiUrl + userPath + "root/delta";

  const response = await axiosInstance.request({
    url: URI,
    method: "GET",
    accessToken: params.accessToken
  })

  return response.data;
}

module.exports = sync;
