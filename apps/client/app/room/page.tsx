"use client";

import { useEffect } from "react";
import { connectSocket } from "../lib/socket";
import { log } from "comm-utils";
import {
  emitJoinRoom,
  offUserJoined,
  onUserJoined,
} from "@/sockets/events/room";
import socket from "@/sockets";

export default function RoomPage() {
  useEffect(() => {
    if (!socket) return;
    // const socket = connectSocket();
    const roomId = "123";
    const userName = "JJ";
    console.log(socket.connected);
    socket.on("connect", () => {
      emitJoinRoom(roomId, userName);

      onUserJoined((data) => {
        console.log(data);
      });
    });

    return () => {
      offUserJoined();
    };
  }, [socket]);
  return (
    <div>
      <div>Room</div>
    </div>
  );
}
