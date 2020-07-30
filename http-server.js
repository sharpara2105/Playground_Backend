const http = require('http');
const { Socket } = require('dgram');
const server = http.createServer(function(req,res) {
    if(req.url === '/') {
        res.write('Hello world');
        res.end();
    }
    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3,4])); // write() take just string values.
        res.end();
    }
});
//1. listen() -> 2. connect()

server.on('connection',(Socket) => {
    console.log('new connection');
});
//we are using socket in place of port .socket is an interface for receiving and sending data.
// also we are registering this connection event listener with this event emitter (server).

server.listen(3000);

console.log('listening on port 3000...');