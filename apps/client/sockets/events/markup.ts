import { useSocketStore } from "@/stores/socketStore";
import {
  INIT_MARKUP,
  MARKUP_ADD,
  MARKUP_DELETE,
  MARKUP_EDIT,
} from "@shared/dist";
import { FabricObject } from "fabric/*";
// import { FabricObject } from "@/types/fabric";

export const emitInitialMarkup = (roomId: string, json: any) => {
  const socket = useSocketStore.getState().socket;
  if (socket) {
    socket.emit(INIT_MARKUP, { roomId, json });
  }
};

export const emitMarkupAdd = (roomId: string, object: FabricObject) => {
  const socket = useSocketStore.getState().socket;
  if (socket) {
    socket.emit(MARKUP_ADD, { roomId, object });
  }
};

export const emitMarkupEdit = (roomId: string, object: FabricObject) => {
  const socket = useSocketStore.getState().socket;
  if (socket) {
    socket.emit(MARKUP_EDIT, { roomId, object });
  }
};

export const emitMarkupDelete = (roomId: string, objectId: string) => {
  const socket = useSocketStore.getState().socket;
  if (socket) {
    socket.emit(MARKUP_DELETE, { roomId, objectId });
  }
};
