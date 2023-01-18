// delete.test.js
import bootstrapTest from "../bootstrap.test.js";
const {accessToken, oneDrive, faker, errorHandler} = bootstrapTest

describe("delete", function () {
  let createdFolder;
  const folderName = "test-" + faker.random.word();

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

  it("Should delete empty folder", function (done) {
    oneDrive.items
      .delete({
        accessToken: accessToken,
        itemId: createdFolder.id,
      })
      .then(function () {
        done();
      })
      .catch(errorHandler(done));
  });
});
