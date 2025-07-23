// index.js - Demonstrating the evolution of asynchronous patterns in Node.js

const fs = require('fs');
const path = require('path');
const util = require('util');

// Create a data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// File paths
const filePath = path.join(dataDir, 'sample.txt');
const newFilePath = path.join(dataDir, 'renamed.txt');


// APPROACH 1: CALLBACK-BASED (TRADITIONAL)

function runCallbackVersion() {
  console.log('\n===== CALLBACK-BASED APPROACH =====');
  console.log('Starting callback-based operations...');
  
  // Write a file
  fs.writeFile(filePath, 'Hello from callback version!', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('File written successfully');
    
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      console.log('File content:', data);
      
      // Append to the file
      fs.appendFile(filePath, '\nMore data appended with callbacks', (err) => {
        if (err) {
          console.error('Error appending to file:', err);
          return;
        }
        console.log('Data appended to file');
        
        // Read the updated file
        fs.readFile(filePath, 'utf8', (err, newData) => {
          if (err) {
            console.error('Error reading updated file:', err);
            return;
          }
          console.log('Updated file content:', newData);
          
          // Rename the file
          fs.rename(filePath, newFilePath, (err) => {
            if (err) {
              console.error('Error renaming file:', err);
              return;
            }
            console.log('File renamed successfully');
            
            // Delete the file
            fs.unlink(newFilePath, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
                return;
              }
              console.log('File deleted successfully');
              console.log('Callback-based operations completed');
            });
          });
        });
      });
    });
  });
}

// APPROACH 2: PROMISE-BASED

// Convert callback-based fs methods to promise-based
const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);
const appendFilePromise = util.promisify(fs.appendFile);
const renamePromise = util.promisify(fs.rename);
const unlinkPromise = util.promisify(fs.unlink);

function runPromiseVersion() {
  console.log('\n===== PROMISE-BASED APPROACH =====');
  console.log('Starting promise-based operations...');
  
  // Chain of promises
  writeFilePromise(filePath, 'Hello from promise version!')
    .then(() => {
      console.log('File written successfully');
      return readFilePromise(filePath, 'utf8');
    })
    .then((data) => {
      console.log('File content:', data);
      return appendFilePromise(filePath, '\nMore data appended with promises');
    })
    .then(() => {
      console.log('Data appended to file');
      return readFilePromise(filePath, 'utf8');
    })
    .then((newData) => {
      console.log('Updated file content:', newData);
      return renamePromise(filePath, newFilePath);
    })
    .then(() => {
      console.log('File renamed successfully');
      return unlinkPromise(newFilePath);
    })
    .then(() => {
      console.log('File deleted successfully');
      console.log('Promise-based operations completed');
    })
    .catch((err) => {
      console.error('Error in promise chain:', err);
    });
}

// APPROACH 3: ASYNC/AWAIT

async function runAsyncAwaitVersion() {
  console.log('\n===== ASYNC/AWAIT APPROACH =====');
  console.log('Starting async/await operations...');
  
  try {
    // Write a file
    await writeFilePromise(filePath, 'Hello from async/await version!');
    console.log('File written successfully');
    
    // Read the file
    const data = await readFilePromise(filePath, 'utf8');
    console.log('File content:', data);
    
    // Append to the file
    await appendFilePromise(filePath, '\nMore data appended with async/await');
    console.log('Data appended to file');
    
    // Read the updated file
    const newData = await readFilePromise(filePath, 'utf8');
    console.log('Updated file content:', newData);
    
    // Rename the file
    await renamePromise(filePath, newFilePath);
    console.log('File renamed successfully');
    
    // Delete the file
    await unlinkPromise(newFilePath);
    console.log('File deleted successfully');
    console.log('Async/await operations completed');
  } catch (err) {
    console.error('Error in async/await function:', err);
  }
}


// RUN ALL APPROACHES SEQUENTIALLY

function runAllApproaches() {
  // Run callback version first
  runCallbackVersion();
  
  // Wait a bit before running promise version
  setTimeout(() => {
    runPromiseVersion();
    
    // Wait a bit before running async/await version
    setTimeout(() => {
      runAsyncAwaitVersion();
    }, 1000);
  }, 1000);
}

// Start the demonstration
runAllApproaches();