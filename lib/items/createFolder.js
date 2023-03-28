const userPathGenerator = require("../helpers/pathHelper");
const {axiosInstance} = require("../helpers/gotHelper");

/**
 * @function createFolder
 * @description Create Folder
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} [params.rootItemId=root] Root Item id
 * @param {String} params.name New folder name
 *
 * @return {Promise<object>} folder meta object.
 */
async function createFolder(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.name) {
    throw new Error("Missing params.name");
  }

  params.rootItemId = params.rootItemId === undefined ? "root" : params.rootItemId;
  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + "items/" + params.rootItemId + "/children";

  const response = await axiosInstance.request({
    url: URI,
    method: "POST",
    accessToken: params.accessToken,
    data: {
      name: params.name,
      folder: {}
    }
  })

  return response.data;
}

module.exports = createFolder;
