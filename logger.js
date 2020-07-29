const EventEmitter = require('events');  //EventEmitter is a  class.

class Logger extends EventEmitter {
    logMessage(message) {
        console.log(message);
        // raise/publish an event:
        this.emit('messageLogged',{id:1,url:'url'}); //publish messaegLogged as an event.
    }
}



module.exports = Logger;