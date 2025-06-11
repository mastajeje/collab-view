import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { toolHelpers } from "@/app/lib/toolHelpers";
import { Tool } from "@shared/types/comm-types";
import { v4 as uuidv4 } from "uuid";
import {
  emitMarkupAdd,
  emitMarkupDelete,
  emitMarkupEdit,
} from "@/sockets/events/markup";
import { CustomFabricObject } from "@/types/types";
import { CANVAS_SIZES } from "@shared/constants/canvas";
import { useScreenStore } from "@/stores/screenStore";

type UseMarkupProps = {
  isCanvasReady: boolean;
  roomId: string;
  fabricCanvasRef: React.RefObject<fabric.Canvas | null>;
};

export const useMarkup = ({
  isCanvasReady,
  roomId,
  fabricCanvasRef,
}: UseMarkupProps) => {
  const { screenSize } = useScreenStore();

  const screenSizeRef = useRef(screenSize);
  useEffect(() => {
    screenSizeRef.current = screenSize;
  }, [screenSize]);

  useEffect(() => {
    const fabricCanvas = fabricCanvasRef.current;
    if (!fabricCanvas || !isCanvasReady) return;
    // Add a unique id to the object when it is added to the canvas
    fabricCanvas.on("object:added", (e) => {
      const currentSize = screenSizeRef.current;
      if (!currentSize) return;
      const width = CANVAS_SIZES[currentSize].width;
      const height = CANVAS_SIZES[currentSize].height;

      const object = e.target as CustomFabricObject;
      if (object.id) return;
      object.id = uuidv4();
      object.data = {
        leftRatio: object.left / width,
        topRatio: object.top / height,

        originCanvasWidth: width,
        originCanvasHeight: height,
      };

      emitMarkupAdd(
        roomId,
        object.toObject(["id", "data"]) as CustomFabricObject,
      );
    });

    fabricCanvas.on("object:modified", (e) => {
      if (e.target) {
        const currentSize = screenSizeRef.current;
        if (!currentSize) return;
        const width = CANVAS_SIZES[currentSize].width;
        const height = CANVAS_SIZES[currentSize].height;
        const target = e.target as CustomFabricObject;
        target.data = {
          leftRatio: target.left / width,
          topRatio: target.top / height,
          originCanvasWidth: width,
          originCanvasHeight: height,
        };
        console.log("modified", target);
        emitMarkupEdit(
          roomId,
          target.toObject(["id", "data"]) as CustomFabricObject,
        );
      }
    });

    fabricCanvas.on("object:removed", (e) => {
      if (e.target) {
        console.log("removed", e.target);
        emitMarkupDelete(roomId, (e.target as CustomFabricObject).id);
      }
    });

    return () => {
      fabricCanvas.dispose();
    };
  }, [isCanvasReady]);

  const setTool = (prevTool: Tool, tool: Tool) => {
    const fabricCanvas = fabricCanvasRef.current;
    if (!fabricCanvas) return;

    if (!fabricCanvas) return;
    toolHelpers[prevTool].off(fabricCanvas);
    toolHelpers[tool].on(fabricCanvas);
  };

  return {
    setTool,
  };
};
