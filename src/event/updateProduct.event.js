const {EventEmitter} = require('events');

const updateEvent = new EventEmitter();

updateEvent.on('updateProduct', (user1, user2) => {
    console.log('update event emitter function called');
    console.log(`username = ${user1} name = ${user2}`);
});

module.exports = updateEvent;