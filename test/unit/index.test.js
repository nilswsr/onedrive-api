import chai from "chai"
const expect = chai.expect;
import value from "../../lib/index.js"

describe("Loading the module", () => {
  it("Should load object with items property which is type of object", () => {
    expect(value).to.be.a("object");
    expect(value.items).to.be.a("object");
  });
});
