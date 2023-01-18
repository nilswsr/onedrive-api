import got from 'got'
import {generateUserPath as userPathGenerator} from "../helpers/pathHelper.js"
import {gotConfig} from "../helpers/gotHelper.js"

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
export default async function createFolder(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.name) {
    throw new Error("Missing params.name");
  }

  params.rootItemId = params.rootItemId === undefined ? "root" : params.rootItemId;
  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + "items/" + params.rootItemId + "/children";

  const gotExtend = got.extend({
    method: "POST",
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
  });

  const response = await gotExtend(URI, {
    json: {
      name: params.name,
      folder: {},
    },
  });

  return response.body;
}
