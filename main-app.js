const EventEmitter = require('events');  //EventEmitter is a  class.


const Logger = require('./logger');
const logger = new Logger();



//In EventEmitters, we publish and listen to the **events by name***.
//ordering is important. At the time of publishing the event, 
//there must be an EventEmitter listener existing to listen to the published event.
//listen to the event:
logger.on('messageLogged',(e) => {
    console.log('listener called',e);
});

logger.logMessage('message-received');





