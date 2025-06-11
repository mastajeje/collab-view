import { useEffect, useRef, useState } from "react";

import { useFabric } from "@/hooks/useFabric";
import { CANVAS_SIZES } from "@shared/constants/canvas";
import { useScreenStore } from "@/stores/screenStore";
import { useResizeCanvas } from "@/hooks/useResizeCanvas";
import { useMarkup } from "@/hooks/useMarkup";
import { Toolbar } from "../molecules/Toolbar";
import { Tool } from "@shared/dist";
import { useParams } from "next/navigation";
import { useSocketStore } from "@/stores/socketStore";

type Props = {
  imgUrl: string;
};

export default function ImageViewer({ imgUrl }: Props) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentTool, setCurrentTool] = useState<Tool>("default");
  const { roomId } = useParams<{ roomId: string }>();
  const { screenSize } = useScreenStore();
  const { listenMarkupEvents } = useSocketStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasElRef, fabricCanvasRef, isCanvasReady } = useFabric({
    imgUrl,
    width: dimensions.width,
    height: dimensions.height,
  });
  const { resizeFabric } = useResizeCanvas({
    canvasRef: fabricCanvasRef,
  });
  const { setTool } = useMarkup({
    isCanvasReady,
    roomId,
    fabricCanvasRef,
  });

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    console.log("fabricCanvasRef.current", canvas);
    if (canvas && isCanvasReady) {
      listenMarkupEvents(canvas);
    }
  }, [isCanvasReady]);

  useEffect(() => {
    if (!containerRef) return;
    if (!canvasElRef.current) return;
    if (screenSize === null) return;
    setDimensions({
      width: CANVAS_SIZES[screenSize].width,
      height: CANVAS_SIZES[screenSize].height,
    });
    resizeFabric(
      CANVAS_SIZES[screenSize].width,
      CANVAS_SIZES[screenSize].height,
    );
  }, [screenSize]);

  const handleToolChange = (prevTool: Tool, tool: Tool) => {
    if (prevTool === tool) return;

    setTool(prevTool, tool);

    // update current tool
    setCurrentTool(tool);
  };
  return (
    <div
      ref={containerRef}
      data-component="image-viewer"
      className={`flex h-full w-full flex-col bg-gray-100 ${
        // if the canvas is overflowing, don't center the canvas
        isOverflowingX(dimensions.width) ? "" : "items-center"
      } ${isOverflowingY(dimensions.height) ? "" : "justify-center"}`}
    >
      {/* Image Viewer */}
      <canvas ref={canvasElRef} className="border-2 border-black" />
      <Toolbar handleToolChange={handleToolChange} prevTool={currentTool} />
    </div>
  );
}

const isOverflowingX = (width: number) => {
  return width > window.innerWidth;
};

const isOverflowingY = (height: number) => {
  return height > window.innerHeight;
};
