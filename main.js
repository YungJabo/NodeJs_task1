const fs = require("fs");
const path = require("path");

const base = "./START";

const createFolder = (base) => {
  fs.exists("./RESULT", (err, isExist) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!isExist) {
      fs.mkdir("./RESULT", (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};

const moveFilesUp = (base) => {
  fs.readdir(base, (err, folders) => {
    if (err) {
      console.log(err);
      return;
    }
    folders.forEach((item) => {
      const localBase = path.join(base, item);
      fs.stat(localBase, (err, state) => {
        if (err) {
          console.log(err);
          return;
        }
        if (state.isFile()) {
          const basename = path.basename(localBase);
          const firstSymb = basename[0].toUpperCase();
          fs.exists(path.join("./RESULT/", firstSymb), (err, isExist) => {
            if (err) {
              console.log(err);
              return;
            }
            if (!isExist) {
              fs.mkdir(path.join("./RESULT/", firstSymb), (err) => {
                if (err) {
                  console.log(err);
                }
                fs.link(
                  localBase,
                  path.join("./RESULT/", firstSymb, basename),
                  (err) => {
                    if (err) {
                      console.log(err);
                    }
                    fs.unlink(localBase, (err) => {
                      if (err) {
                        console.log(err);
                      }
                    });
                  }
                );
              });
            } else {
              fs.link(
                localBase,
                path.join("./RESULT/", firstSymb, basename),
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                  fs.unlink(localBase, (err) => {
                    if (err) {
                      console.log(err);
                    }
                  });
                }
              );
            }
          });
        } else {
          moveFilesUp(localBase);
        }
        // fs.rmdir(base, (err) => {
        //   if (err) {
        //     console.log(err);
        //   }
        // });
      });
    });
  });
};

createFolder(base);
moveFilesUp(base);
