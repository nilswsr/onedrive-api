// sync.test.js
import bootstrapTest from "../bootstrap.test.js";
const {accessToken, oneDrive, expect, errorHandler} = bootstrapTest

describe("Sync Delta", function () {
  it("should retrieve recent sync data", function (done) {
    oneDrive.items
      .sync({
        accessToken: accessToken,
      })
      .then(function (recentItems) {
        expect(recentItems).to.be.a("Object");
        expect(recentItems["@odata.context"]).to.be.a("String");
        expect(recentItems.value).to.be.a("Array");
        done();
      })
      .catch(errorHandler(done));
  });
});
