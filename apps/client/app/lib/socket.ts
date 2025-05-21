import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:8080";
let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL);
  }
  return socket;
};
