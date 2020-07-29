const http = require('http');
const { Socket } = require('dgram');
const server = http.createServer(function(req,res) {
    if(req.url === '/') {
        res.write('Hello world');
        res.end();
    }
    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3,4]));
        res.end();
    }
});
//1. listen() -> 2. connect()

server.on('connection',(Socket) => {
    console.log('new connection');
});


server.listen(3000);

console.log('listening on port 3000...');