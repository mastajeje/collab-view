import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // 개발 환경에서는 모든 출처 허용
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join', ({roomId, userName}) => {
    socket.join(roomId);
    // socket.to(roomId).emit('user-joined', {id: socket.id, userName});
    io.emit('user-joined', {id: socket.id, userName});
    console.log(`User ${userName} joined room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(8080, () => {
  console.log(`Signaling server is running on port ${PORT}`);
});
