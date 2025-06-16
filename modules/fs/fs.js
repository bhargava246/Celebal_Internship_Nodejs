const fs = require('fs');

//in async manner
// console.log("start");
// fs.writeFile('output.txt','Hello ,Node.js',(err)=>{
//     if(err) throw err;
//     console.log("File Written");
// });
// fs.appendFile('output.txt','appended content',(err)=>{
//     if(err) throw err;
//     console.log('File appended');
// })
// fs.readFile('output.txt','utf-8',(err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })
// console.log("END");

//now in sync manner
console.log("start");
fs.writeFileSync('output.txt','NEW Himanshu')
console.log("written");
const data = fs.readFileSync('output.txt','utf-8')
console.log(data);



fs.appendFileSync('output.txt','file appended')
console.log("appended");

console.log(fs.existsSync('output.txt'));

fs.mkdirSync('newFolder');
console.log("new folder made");

const files = fs.readdirSync('./')
console.log(files);
fs.renameSync('output.txt','new.txt');
console.log("file renamed");

fs.unlinkSync('new.txt')
console.log("file deleted");

fs.rmdirSync('newFolder');
console.log('folder deleted');

console.log("end");
// Checks if a folder exists, creates it if not

// Writes a file inside it

// Appends more data

// Reads it back

// Deletes it all