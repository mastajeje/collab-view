import { useSocketStore } from "@/stores/socketStore";
import { SEND_IMAGE } from "@shared/constants/socket-events";
import { log } from "comm-utils";

export const sendImage = (image: Base64URLString, roomId: string) => {
  const socket = useSocketStore.getState().socket;
  if (socket && socket.connected) {
    socket.emit(SEND_IMAGE, { image, roomId });
  } else {
    log("socket is not connected");
  }
};
