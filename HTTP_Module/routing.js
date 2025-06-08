import http from 'http'

const server = http.createServer((req,res)=>{
    if(req.url === '/' ){
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end('<h1>Home Page</h1>');
    }else if(req.url === '/about'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1>About Us </h1>');
    }else{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1>404-Page Not Found</h1>');
    }
});

server.listen(3000,()=>{
    console.log("Server is listening at 3000");
})

// | Code | Meaning               |
// | ---- | --------------------- |
// | 200  | OK                    |
// | 404  | Not Found             |
// | 500  | Internal Server Error |
// | 301  | Redirect (Moved)      |
