import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { toolHelpers } from "@/app/lib/toolHelpers";
import { Tool } from "@shared/types/comm-types";

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

    return () => {
      markupCanvas.dispose();
    };
  }, [width, height]);

  const setTool = (prevTool: Tool, tool: Tool) => {
    const canvas = markupCanvasRef.current;
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
