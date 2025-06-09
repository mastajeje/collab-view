import { log } from "comm-utils";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import {
  CONNECT,
  RECEIVE_IMAGE,
  JOIN,
  USER_JOINED,
} from "@shared/constants/socket-events";
import { Canvas } from "fabric/*";
import * as fabric from "fabric";
import {
  INIT_MARKUP,
  MARKUP_ADD,
  MARKUP_DELETE,
  MARKUP_EDIT,
} from "@shared/dist";
// import { } from "@shared/dist";
const SOCKET_URL = "http://localhost:8080";

interface CustomFabricObject extends fabric.Object {
  id: string;
}

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
  listenMarkupEvents: (canvas: Canvas) => void;
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

  listenMarkupEvents: (canvas: Canvas) => {
    const socket = get().socket;
    if (!socket) return;

    socket.on(INIT_MARKUP, ({ json }) => {
      canvas.loadFromJSON(json, () => canvas.renderAll());
    });

    socket.on(MARKUP_ADD, async (object) => {
      const objects = await fabric.util.enlivenObjects([object]);
      objects.forEach((object) => {
        canvas.add(object as fabric.Object);
      });
      canvas.renderAll();
    });

    socket.on(MARKUP_EDIT, (object) => {
      const target = canvas
        .getObjects()
        .find((obj) => (obj as CustomFabricObject).id === object.id);
      if (target) {
        const { type, ...updatableProps } = object;
        target.set(updatableProps);
        // target.set(object);
        canvas.renderAll();
      }
    });

    socket.on(MARKUP_DELETE, (objectId) => {
      const target = canvas
        .getObjects()
        .find((obj) => (obj as CustomFabricObject).id === objectId);
      if (target) {
        canvas.remove(target);
        canvas.renderAll();
      }
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
