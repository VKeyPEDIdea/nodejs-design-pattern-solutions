import fs from 'node:fs';

function concatFiles(...args) {
	const [cb, dest, ...files] = args.reverse();
	const acc = { data: '' };
	readFile(files.reverse(), acc, 0, () => cb(dest, acc.data));
}

function readFile(files, acc, index, cb) {
	if (index === files.length) return cb();
	const file = files[index];

	fs.readFile(file, 'utf8', (err, data) => {
		if (err) return err;
		acc.data += data;
		console.log(file, 'file has been read');
		readFile(files, acc, index + 1, cb);
	});
}

function saveFile(dest, data) {
	fs.writeFile(dest, data, (err) => {
		if (err) throw err;
		console.log('File has been written');
	});
}

concatFiles('1.txt', '2.txt', '3.txt', 'result.txt', saveFile);

