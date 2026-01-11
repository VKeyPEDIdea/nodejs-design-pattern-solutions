import fs from 'node:fs';
// recursiveFind('myDir', 'batman', console.log)
// should print ['foo.txt', 'baz.txt']
function recursiveFind(dir, keyword, cb) {
  fs.readdir(dir, { recursive: true }, (err, pathes) => {
    if (err) return cb(err);
    const files = [];
    pathes.forEach((path, i) => {
      const filepath = dir + path;
      fs.stat(filepath, (error, stats) => {
        if (err) return cb(error);
        if (!stats.isDirectory()) {
          fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) return cb(err);
            if (data.includes(keyword)) files.push(filepath);
            if (pathes.length - 1 === i) cb(null, files);
          });
          // TODO: try to extract callback to separate function
          // to avoid callback hell
        }
      });
    });
  });
}

function handler(error, files) {
  if (error) console.error(error);
  if (files.length) {
    console.log(files.length, 'file[s] contain searched query:', ...files);
  } else {
    console.log('Files not found');
  }
}

recursiveFind(process.argv[2], process.argv[3], handler);

