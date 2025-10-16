import fs from 'node:fs';

function listNestedFiles(dir, cb) {
	fs.readdir(dir, { recursive: true }, (err, pathes) => {
		if (err) return cb(err);
		const files = [];
		pathes.forEach((path, index) => {
			fs.stat(dir + path, (err, stats) => {
				if (err) return cb(err);
				if (!stats.isDirectory()) files.push(path);
				if (pathes.length - 1 === index) cb(null, files);
			});
		});
	});
}

function finish(err, files) {
	if (err) return console.error(err);
	console.log(files, 'have been found');
}

listNestedFiles(process.argv[2], finish);

