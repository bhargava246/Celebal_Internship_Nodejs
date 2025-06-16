import http from 'http'
const server = http.createServer((req,res)=>{
    console.log("Request URL:",req.url);
    res.end('check the console for url');
})

server.listen(3000,()=>{
    console.log(`Server running at http://localhost:3000`);
})