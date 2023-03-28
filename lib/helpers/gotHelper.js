const axios = require("axios");
const {apiUrl} = require("../config");

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
  responseType: "json"
})

axiosInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = config.accessToken
  return config
})


module.exports = {
  axiosInstance
}
