// uploadSimple.test.js
import bootstrapTest from "../bootstrap.test.js";
const {accessToken, oneDrive, expect, faker, errorHandler} = bootstrapTest
import stringStream from "string-to-stream"

import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';

describe("uploadSession", function () {
  const fileValidated = (item, equalSize = undefined) => {
    expect(item.id).to.be.a("String");
    expect(item.name).to.be.a("String");
    expect(item.size).to.be.a("Number");
    expect(item.size).to.be.at.least(1);
    if (equalSize !== undefined && equalSize > 0) {
      expect(item.size).to.be.equal(equalSize);
    }
  };

  describe("Should upload Session 1kB file using Stream in root directory", function () {
    let createdFile;

    it("Should upload Session 1kB file using Stream in root directory", function (done) {
      const filename = "test-uploadSession-" + faker.random.word();
      // 1Kb
      const fileContent = "a".repeat(1024);
      const readableStream = stringStream(fileContent);

      oneDrive.items
        .uploadSession({
          accessToken: accessToken,
          filename: filename,
          readableStream: readableStream,
          fileSize: fileContent.length,
        })
        .then(function (item) {
          fileValidated(item);
          createdFile = item;
          done();
        })
        .catch((err) => {
          console.error("Error Handled");
          console.error(err);
          errorHandler(done);
        });
    });

    after(function (done) {
      oneDrive.items
        .delete({
          accessToken: accessToken,
          itemId: createdFile.id,
        })
        .then(function (_folder) {
          done();
        })
        .catch(errorHandler(done));
    });
  });

  describe("Should upload Session 10MB file using Stream", function () {
    let createdFile;

    it("Should upload Session 10MB file using Stream", function (done) {
      this.timeout(60 * 1000);
      const filename = "test-uploadSession-" + faker.random.word();
      // 10MB
      const exampleDirName = path.dirname(fileURLToPath(import.meta.url))
      const exampleFilePath = path.join(exampleDirName, "../../example-data/10MB_file.txt");
      const readableStream = fs.createReadStream(exampleFilePath);
      const fsStat = fs.statSync(exampleFilePath);
      const processReport = (process) =>
        console.log(`Uploaded bytes: ${process}/${fsStat.size} (${((process / fsStat.size) * 100).toFixed(3)})%`);
      oneDrive.items
        .uploadSession(
          {
            accessToken: accessToken,
            filename: filename,
            readableStream: readableStream,
            fileSize: fsStat.size,
          },
          processReport,
        )
        .then(function (item) {
          fileValidated(item, fsStat.size);
          createdFile = item;
          done();
        })
        .catch(() => {
          errorHandler(done);
        });
    });
    after(function (done) {
      oneDrive.items
        .delete({
          accessToken: accessToken,
          itemId: createdFile.id,
        })
        .then(function (_folder) {
          done();
        })
        .catch(errorHandler(done));
    });
  });

  describe("Should upload Session 1kb file inside a folder using parentId", function () {
    let filename, readableStream, fileContent, folderName, createdFolder, createdFile;

    before(function (done) {
      filename = "test-uploadSession-" + faker.random.word();
      fileContent = "a".repeat(1024);
      readableStream = stringStream(fileContent);
      folderName = "test-uploadSessionFolder-" + faker.random.word();

      oneDrive.items
        .createFolder({
          accessToken: accessToken,
          rootItemId: "root",
          name: folderName,
        })
        .then(function (folder) {
          createdFolder = folder;
          done();
        })
        .catch(done);
    });

    it("Should upload Session 1kb file inside a folder using parentId", function (done) {
      filename = "test-uploadSession-" + faker.random.word();
      // 1Kb

      oneDrive.items
        .uploadSession({
          accessToken: accessToken,
          filename: filename,
          readableStream: readableStream,
          fileSize: fileContent.length,
          parentId: createdFolder.id,
        })
        .then(function (item) {
          fileValidated(item);
          createdFile = item;
          done();
        })
        .catch((err) => {
          console.error(err);
          errorHandler(done);
        });
    });

    after(function (done) {
      oneDrive.items
        .delete({
          accessToken: accessToken,
          itemId: createdFile.id,
        })
        .then(function () {
          return oneDrive.items.delete({
            accessToken: accessToken,
            itemId: createdFolder.id,
          });
        })
        .then(function (_folder) {
          done();
        })
        .catch(errorHandler(done));
    });
  });

  describe("Should upload Session 1kb file inside a folder using parentPath", function () {
    let filename, readableStream, fileContent, folderName, createdFolder, createdFile;

    before(function (done) {
      filename = "test-uploadSession-" + faker.random.word();
      fileContent = "a".repeat(1024);
      readableStream = stringStream(fileContent);
      folderName = "test-uploadSessionFolder-" + faker.random.word();

      oneDrive.items
        .createFolder({
          accessToken: accessToken,
          rootItemId: "root",
          name: folderName,
        })
        .then(function (folder) {
          createdFolder = folder;
          done();
        })
        .catch(done);
    });

    it("Should upload Session 1kb file inside a folder using parentPath", function (done) {
      oneDrive.items
        .uploadSession({
          accessToken: accessToken,
          filename: filename,
          readableStream: readableStream,
          fileSize: fileContent.length,
          parentPath: folderName,
        })
        .then(function (item) {
          fileValidated(item);
          createdFile = item;
          done();
        })
        .catch((err) => {
          console.error(err);
          errorHandler(done);
        });
    });

    after(function (done) {
      oneDrive.items
        .delete({
          accessToken: accessToken,
          itemId: createdFile.id,
        })
        .then(function () {
          return oneDrive.items.delete({
            accessToken: accessToken,
            itemId: createdFolder.id,
          });
        })
        .then(function (_folder) {
          done();
        })
        .catch(errorHandler(done));
    });
  });
});
