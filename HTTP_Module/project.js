import http from 'http'
import fs from 'fs'
import path from 'path'
const server = http.createServer((req, res) => {
  let filePath = './index.html';
  if (req.url === '/about') {
    filePath = './about.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('<h1>404 - File Not Found</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log('🚀 Server is running at http://localhost:3000');
});
