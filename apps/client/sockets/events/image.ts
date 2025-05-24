import { useSocketStore } from "@/stores/socketStore";
import { log } from "comm-utils";

export const sendImage = (image: Base64URLString) => {
  const socket = useSocketStore.getState().socket;
  if (socket && socket.connected) {
    socket.emit("send-image", { image });
  } else {
    log("socket is not connected");
  }
};
