const path = require('path');

console.log(path.basename('/users/admin/file.txt'));

console.log(path.dirname('/users/admin/file.txt'));

console.log(path.extname('/users/admin/file.txt'));

const joinedPath = path.join('folder','subfolder','file.txt')
console.log(joinedPath);

const absolutePath = path.resolve('folder','file.txt');
console.log(absolutePath);

const parsed = path.parse('/home/user/file.txt');
console.log(parsed);

const formatted = path.format({
    dir: '/home/user',
    name: 'file',
    ext: '.txt'
});
console.log(formatted);

console.log(path.isAbsolute(absolutePath));
console.log(path.isAbsolute('file.txt'));


// Accepts a file path using process.argv

// Extracts and prints:

// Directory

// Base name

// Extension

// Absolute path

// Creates a new file in the same directory