// lib/index.js
import items from "./items/index.js"
import config from "./config.js"

global.appConfig = config;

export default {
  items: items
}
