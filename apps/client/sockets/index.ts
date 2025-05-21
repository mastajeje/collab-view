import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "http://localhost:8080";
// let socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
// let socket: Socket = io("http://localhost:8080", {
//   transports: ["websocket"],
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// export default socket;

const socket = io("http://localhost:8080");

if (socket) {
  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
}

export { socket };
