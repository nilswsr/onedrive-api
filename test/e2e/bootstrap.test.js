import oneDrive from "../../lib/index.js"
import mocha from "mocha"
import chai from "chai"
import credentials from "./credentials.js";
import faker from "faker"

// global errorHandler that ensures that whole error is logged, not just [object Object]
const errorHandler = function (done) {
  return function (err) {
    console.error(err);
    done(err);
  };
};

export default {
  accessToken: credentials.accessToken,
  oneDrive: oneDrive,
  mocha: mocha,
  expect: chai.expect,
  faker: faker,
  errorHandler: errorHandler
}
