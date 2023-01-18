// getMetadata.test.js
import bootstrapTest from "../bootstrap.test.js";
const {accessToken, oneDrive, expect, faker, errorHandler} = bootstrapTest

describe("getMetadata", function () {
  let createdFolder;
  const folderName = "test-getmedatada-" + faker.random.word();

  before(function (done) {
    //create folder and files inside
    oneDrive.items
      .createFolder({
        accessToken: accessToken,
        rootItemId: "root",
        name: folderName,
      })
      .then(function (_folder) {
        createdFolder = _folder;
        done();
      })
      .catch(done);
  });

  after(function (done) {
    oneDrive.items
      .delete({
        accessToken: accessToken,
        itemId: createdFolder.id,
      })
      .then(function (_item) {
        done();
      })
      .catch(errorHandler(done));
  });

  it("Should get metadata of folder", function (done) {
    oneDrive.items
      .getMetadata({
        accessToken: accessToken,
        itemId: createdFolder.id,
      })
      .then(function (item) {
        expect(item).to.be.a("object");
        done();
      })
      .catch(errorHandler(done));
  });
});
