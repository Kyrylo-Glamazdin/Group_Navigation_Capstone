import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:5000')

function subscribeToTimer(cb){
    socket.on('timer', timestapm => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}

export {subscribeToTimer}