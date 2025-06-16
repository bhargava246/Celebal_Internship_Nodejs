const os = require('os');
console.log(os.arch());
console.log(os.platform());
console.log(os.type());
console.log(os.hostname());
console.log(os.userInfo());
console.log(os.uptime());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.cpus());
console.log(os.networkInterfaces());


// Takes no input (or optional flag like --json)

// Logs details like:

// Platform, Arch

// Hostname

// CPU model and count

// Free/Total memory

// Uptime

// Optionally writes this info to a file