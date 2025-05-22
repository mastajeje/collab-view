import { log } from "comm-utils";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { CONNECT } from "@shared/constants/socket-events";
const SOCKET_URL = "http://localhost:8080";

interface SocketStore {
  socket: Socket | null;
  isConnected: boolean;
  nickname: string;
  roomId: string;

  connect: () => void;
  disconnect: () => void;
  onEvents: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  nickname: "",
  roomId: "",

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

  onEvents: () => {
    const socket = get().socket;
    if (!socket) return;

    socket.on("join", (data) => {
      log("방 참가 완료", data);
      set({ roomId: data.roomId });
    });

    socket.on("user-joined", (data) => {
      log("다른 유저가 입장", data);
    });

    // 필요한 다른 이벤트 추가
  },
}));
