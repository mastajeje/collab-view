import { log } from "comm-utils";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { CONNECT, RECEIVE_IMAGE } from "@shared/constants/socket-events";
import { JOIN, USER_JOINED } from "@shared/dist";
const SOCKET_URL = "http://localhost:8080";

interface SocketStore {
  //   State
  socket: Socket | null;
  isConnected: boolean;
  username: string;
  roomId: string;
  image: string;

  //   Actions
  setRoomInfo: (roomId: string, username: string) => void;
  connect: () => void;
  disconnect: () => void;
  onEvents: () => void;
  initImageListener: (callback: (image: string) => void) => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  username: "",
  roomId: "",
  image: "",

  setRoomInfo: (roomId: string, username: string) => {
    set({ roomId, username });
  },

  connect: () => {
    if (get().socket) return;

    const socket = io(SOCKET_URL, {
      autoConnect: false,
    });

    socket.connect();

    socket.on(CONNECT, () => {
      log("connected");
      set({ isConnected: true });
    });
    socket.on("disconnect", () => {
      log("disconnected");
      //   set({ isConnected: false, socket: null });
    });
    set({ socket });
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ isConnected: false, socket: null });
    }
  },

  // 이미지 수신 이벤트 리스너 추가
  initImageListener: (callback) => {
    const socket = get().socket;
    if (!socket) return;

    socket.on(RECEIVE_IMAGE, (image: string) => {
      callback(image);
    });
  },

  onEvents: () => {
    const socket = get().socket;
    if (!socket) return;

    socket.on(JOIN, (data) => {
      log("방 참가 완료", data);
      set({ roomId: data.roomId });
    });

    socket.on(USER_JOINED, (data) => {
      log("다른 유저가 입장", data);
    });

    // 필요한 다른 이벤트 추가
  },
}));
