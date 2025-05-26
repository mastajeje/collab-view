import { RECEIVE_MESSAGE } from "@shared/constants/socket-events";
import { Socket } from "socket.io-client";
import { create } from "zustand";

// State
type Message = {
  id: number;
  sender: string;
  content: string;
};

type ChatStore = {
  messages: Message[];
  addMessage: (msg: Message) => void;
  initMessageListener: (
    socket: Socket,
    callback: (data: { message: string; sender: string }) => void,
  ) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  initMessageListener: (socket, callback) => {
    if (!socket) return;

    socket.on(RECEIVE_MESSAGE, (data) => {
      callback(data);
    });
  },
}));
