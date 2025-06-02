import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { text } from "stream/consumers";
import {
  handleEraserTool,
  handlePenTool,
  handleTextTool,
} from "@/app/lib/markupTools";
export const useMarkup = ({ roomId }: { roomId: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const markupCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const canvasEl = document.createElement("canvas");
    canvasEl.id = "markup-canvas";
    containerRef.current.appendChild(canvasEl);

    const markupCanvas = new fabric.Canvas(canvasEl, {
      width: 800,
      height: 600,
      selection: false,
    });

    markupCanvasRef.current = markupCanvas;
  }, [roomId]);

  const setTool = (tool: "select" | "pen" | "text" | "eraser") => {
    const canvas = markupCanvasRef.current;
    if (!canvas) return;
    // new fabric.EraserBrush();
    if (tool === "pen") {
      handlePenTool(canvas);
      //   canvas.isDrawingMode = true;
      //   const brush = new fabric.PencilBrush(canvas);
      //   brush.color = "black";
      //   brush.width = 5;
      //   canvas.freeDrawingBrush = brush;
    }

    if (tool === "text") {
      handleTextTool(canvas);

      //   canvas.on("mouse:up", (e) => {
      //     const pointer = canvas.getViewportPoint(e.e);
      //     if (e.target) return;
      //     const text = new fabric.IText("텍스트 입력", {
      //       left: pointer.x,
      //       top: pointer.y,
      //       fontSize: 16,
      //       fill: "black",
      //     });
      //     canvas.add(text);
      //     canvas.setActiveObject(text);
      //   });
    }

    if (tool === "eraser") {
      handleEraserTool(canvas);
    }
  };

  return {
    containerRef,
    markupCanvasRef,
    setTool,
  };
};
