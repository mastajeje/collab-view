import { SEND_IMAGE, SEND_MESSAGE } from "@shared/constants/socket-events";
import { JOIN } from "@shared/dist";
import { Socket } from "socket.io-client";

export const sendMessage = (
  socket: Socket,
  message: string,
  sender: string,
) => {
  socket.emit(SEND_MESSAGE, { message, sender });
};

export const joinRoom = (socket: Socket, roomId: string, userName: string) => {
  socket.emit(JOIN, { roomId, userName });
};
