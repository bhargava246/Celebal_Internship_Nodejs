import http from 'http';
import fs from 'fs';
import path from 'path';
import url, { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    const fileName = query.fileName;
    const filePath = path.join(__dirname, 'files', fileName || '');

    const dir = path.join(__dirname, 'files');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    res.setHeader('Content-Type', 'text/plain');

    if (pathname === '/create' && req.method === 'GET') {
        if (!fileName || !query.content) {
            res.statusCode = 400;
            return res.end('Missing filename or content');
        }

        fs.writeFile(filePath, query.content, (err) => {
            if (err) {
                res.statusCode = 500;
                return res.end('Error creating file');
            }
            res.statusCode = 200;
            res.end(`File '${fileName}' created successfully`);
        });

    } else if (pathname === '/read' && req.method === 'GET') {
        if (!fileName) {
            res.statusCode = 400;
            return res.end('Missing filename');
        }

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                return res.end('File not found');
            }
            res.statusCode = 200;
            res.end(data);
        });

    } else if (pathname === '/delete' && req.method === 'GET') {
        if (!fileName) {
            res.statusCode = 400;
            return res.end('File is missing');
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                res.statusCode = 404;
                return res.end('File not found');
            }
            res.statusCode = 200;
            res.end(`File '${fileName}' deleted successfully`);
        });

    } else {
        res.statusCode = 404;
        res.end('Route not found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
