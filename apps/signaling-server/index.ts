import {
  JOIN,
  SEND_IMAGE,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  RECEIVE_IMAGE,
  USER_JOINED,
  DISCONNECT,
  MARKUP_ADD,
  MARKUP_EDIT,
  MARKUP_DELETE,
  CALL_ACCEPT,
} from '@shared/dist';
// import {JOIN, USER_JOINED, DISCONNECT} from '@shared/dist';
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

  socket.on(JOIN, ({roomId, userName}) => {
    socket.join(roomId);

    io.in(roomId).emit(USER_JOINED, {id: socket.id, userName});
    // io.emit('user-joined', {id: socket.id, userName});
    console.log(`User ${userName} joined room ${roomId}`);
  });

  //   socket.on('test', (data) => {
  //     console.log('Received test event:', data);
  //     console.log('Socket IDs:', socket.id);
  //     console.log('Event data:', JSON.stringify(data, null, 2));
  //   });

  socket.on(SEND_IMAGE, ({image, roomId}) => {
    socket.to(roomId).emit(RECEIVE_IMAGE, image);
  });

  socket.on(SEND_MESSAGE, ({message, sender}) => {
    socket.broadcast.emit(RECEIVE_MESSAGE, {message, sender});
  });

  socket.on(MARKUP_ADD, ({object, roomId}) => {
    console.log('MARKUP_ADD', roomId);
    socket.to(roomId).emit(MARKUP_ADD, object);
  });

  socket.on(MARKUP_EDIT, ({object, roomId}) => {
    socket.to(roomId).emit(MARKUP_EDIT, object);
  });

  socket.on(MARKUP_DELETE, ({objectId, roomId}) => {
    socket.to(roomId).emit(MARKUP_DELETE, objectId);
  });

  socket.on(DISCONNECT, () => {
    console.log('Client disconnected:', socket.id);
  });

  // webRTC
  socket.on('offer', ({roomId, offer}) => {
    socket.to(roomId).emit('offer', {offer});
  });

  socket.on('answer', ({roomId, answer}) => {
    console.log('answer', roomId);
    socket.to(roomId).emit('answer', {answer});
  });

  socket.on('ice-candidate', ({roomId, candidate}) => {
    socket.to(roomId).emit('ice-candidate', {candidate});
  });

  // Call socket
  socket.on('call:request', ({roomId}) => {
    socket.to(roomId).emit('call:request', {from: 'jj'});
  });

  socket.on(CALL_ACCEPT, ({roomId}) => {
    socket.to(roomId).emit(CALL_ACCEPT);
  });
});

server.listen(8080, () => {
  console.log(`Signaling server is running on port ${PORT}`);
});
