require('dotenv').config();
const http = require('http');
const PORT = 5001;
const HOST = '127.0.0.1';

const server = http.createServer(require('./app'));

server.listen(PORT, HOST,() => {
    console.log(`Server is running http://${HOST}:${PORT}`);
});
