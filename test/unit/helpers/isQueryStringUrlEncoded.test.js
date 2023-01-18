import chai from "chai"
const expect = chai.expect;
import {isQueryStringUrlEncoded} from "../../../lib/helpers/isQueryStringUrlEncoded.js";

describe("isQueryStringUrlEncoded", () => {
  it("Should return true for valid query strings", () => {
    const validStrings = ["foo", "?bar=2", "?bar%20foo"];
    validStrings.forEach((validString) => {
      expect(isQueryStringUrlEncoded(validString)).to.be.true;
    });
  });

  it("Should return false for invalid query strings", () => {
    const validStrings = ["foo bar"];
    validStrings.forEach((validString) => {
      expect(isQueryStringUrlEncoded(validString)).to.be.false;
    });
  });
});
