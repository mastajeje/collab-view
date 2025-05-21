import socket from "../index";

export const emitJoinRoom = (roomId: string, userName: string) => {
  console.log(socket);
  console.log(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL);
  socket.emit("join", { roomId, userName });
};

export const onUserJoined = (
  callback: (data: { id: string; userName: string }) => void,
) => {
  socket.on("user-joined", callback);
};

// export const onUserLeft = (
//   callback: (data: { id: string; userName: string }) => void,
// ) => {
//   socket.on("user-left", callback);
// };

export const offUserJoined = () => {
  socket.off("user-joined");
};
