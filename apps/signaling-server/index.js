import {WebSocketServer} from 'ws';

const wss = new WebSocketServer({port: 8080});

wss.on('connection', (ws) => {
    console.log('Client connected')
})

console.log('Signaling server is running on port 8080');