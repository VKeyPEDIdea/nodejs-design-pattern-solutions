import fs from 'node:fs';
// recursiveFind('myDir', 'batman', console.log)
// should print ['foo.txt', 'baz.txt']
function recursiveFind(dir, keyword, cb) {
	fs.readdir(dir, { recursive: true }, (err, pathes) => {
		if (err) return cb(err);
		const files = [];
		pathes.forEach((path, i) => {
			fs.stat(dir + path, (error, stats) => {
				if (err) return cb(error);
				if (!stats.isDirectory()) {
					// read file and regex for the keyword 
					// TODO: try to extract callback to separate function
					// to avoid callback hell
				}
				if (pathes.length - 1 === index) cb(null, files);
			});
		});
	});
}
