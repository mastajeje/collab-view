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
// Define a custom type that extends FabricObject
interface CustomFabricObject extends fabric.Object {
  id: string;
}

type UseMarkupProps = {
  roomId: string;
  width: number;
  height: number;
};

export const useMarkup = ({ roomId, width, height }: UseMarkupProps) => {
  const markupCanvasRef = useRef<fabric.Canvas | null>(null);
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasElRef.current || !width || !height) return;
    const markupCanvas = new fabric.Canvas(canvasElRef.current, {
      width,
      height,
      selection: false,
      //   backgroundColor: "black",
    });

    markupCanvasRef.current = markupCanvas;

    // Add a unique id to the object when it is added to the canvas
    markupCanvas.on("object:added", (e) => {
      const target = e.target as CustomFabricObject;
      if (target.id) return;
      target.id = uuidv4();
      emitMarkupAdd(roomId, target.toObject(["id"]) as CustomFabricObject);
      console.log(e.target);
    });

    markupCanvas.on("object:modified", (e) => {
      if (e.target) {
        console.log("modified", e.target);
        emitMarkupEdit(roomId, e.target.toObject(["id"]) as CustomFabricObject);
      }
    });

    markupCanvas.on("object:removed", (e) => {
      if (e.target) {
        console.log("removed", e.target);
        emitMarkupDelete(roomId, (e.target as CustomFabricObject).id);
      }
    });

    return () => {
      markupCanvas.dispose();
    };
  }, [width, height]);

  const setTool = (prevTool: Tool, tool: Tool) => {
    const canvas = markupCanvasRef.current;
    if (!canvas) return;

    if (!canvas) return;
    toolHelpers[prevTool].off(canvas);
    toolHelpers[tool].on(canvas);
  };

  return {
    // containerRef,
    markupCanvasRef,
    canvasElRef,
    setTool,
  };
};
