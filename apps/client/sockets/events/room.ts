import { SEND_IMAGE } from "@shared/constants/socket-events";
import { JOIN } from "@shared/dist";
import { Socket } from "socket.io-client";

export const joinRoom = (socket: Socket, roomId: string, userName: string) => {
  socket.emit(JOIN, { roomId, userName });
};

export const sendImage = (socket: Socket, image: Base64URLString) => {
  socket.emit(SEND_IMAGE, { image });
};
