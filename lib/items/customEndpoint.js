const {axiosInstance} = require("../helpers/gotHelper");

/**
 * @function customEndpoint
 * @description Custom Endpoint
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.url Ex. 'groups/{groupId}/drives'
 * @param {Object} [params.body] Request body
 * @param {Object} [params.method] Request method
 *
 * @return {Promise<Object>} any
 */
async function customEndpoint(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.url) {
    throw new Error("Missing params.url");
  }

  const uri = appConfig.apiUrl + params.url;

  const response = await axiosInstance.request({
    url: uri,
    method: params.method || "POST",
    accessToken: params.accessToken,
    data: params.body || {}
  })

  return response.data;
}

module.exports = customEndpoint;
