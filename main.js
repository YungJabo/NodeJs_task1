const fs = require("fs");
const path = require("path");

const base = "./START";

const moveFoldersUp = (base) => {
  const folders = fs.readdirSync(base);
  folders.forEach((item) => {
    const localBase = path.join(base, item);
    const state = fs.statSync(localBase);
    if (state.isDirectory()) {
      const basename = path.basename(localBase);
      moveFoldersUp(localBase);
      fs.renameSync(localBase, "./RESULT/" + basename, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
  //   fs.rmdirSync(base);
};

const moveFilesUp = (base) => {
  if (!fs.existsSync("./RESULT")) {
    fs.mkdirSync("./RESULT");
  }
  const folders = fs.readdirSync(base);
  folders.forEach((item) => {
    const localBase = path.join(base, item);
    const state = fs.statSync(localBase);
    if (state.isFile()) {
      const basename = path.basename(localBase);
      fs.linkSync(localBase, "./RESULT/" + basename, (err) => {
        if (err) {
          console.log(err);
        }
      });
      fs.unlinkSync(localBase);
    } else {
      moveFilesUp(localBase);
    }
  });
};

const sort = (base) => {
  const files = fs.readdirSync(base);
  files.forEach((item) => {
    const localBase = path.join(base, item);
    const state = fs.statSync(localBase);
    if (state.isFile()) {
      const basename = path.basename(localBase);
      const firstSymb = basename[0].toUpperCase();
      fs.linkSync(
        localBase,
        "./RESULT/" + firstSymb + "/" + basename,
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      fs.unlinkSync(localBase);
    } else {
      moveFilesUp(localBase);
    }
  });
};

moveFilesUp(base);
moveFoldersUp(base);
sort("./RESULT");
