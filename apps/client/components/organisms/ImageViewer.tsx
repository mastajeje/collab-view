import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { getDimensions } from "@/app/lib/getSize";
import { useFabric } from "@/hooks/useFabric";
import { sendImage } from "@/sockets/events/image";
import { CANVAS_SIZES } from "@shared/constants/canvas";
import { useScreenStore } from "@/stores/screenStore";
import { useResizeCanvas } from "@/hooks/useResizeCanvas";
import { useMarkup } from "@/hooks/useMarkup";
import { Toolbar } from "../molecules/Toolbar";
import { Tool } from "@shared/dist";

type Props = {
  imgUrl: string;
};

export default function ImageViewer({ imgUrl }: Props) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentTool, setCurrentTool] = useState<Tool>("default");

  const { screenSize } = useScreenStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasElRef, fabricCanvasRef } = useFabric({
    imgUrl,
    width: dimensions.width,
    height: dimensions.height,
    // width: dimensions.width,
    // height: dimensions.height,
  });
  const { resizeFabric } = useResizeCanvas({ canvasRef: fabricCanvasRef });
  const { setTool } = useMarkup({
    roomId: "1",
    fabricCanvasRef,
    width: dimensions.width,
    height: dimensions.height,
  });
  //   useEffect(() => {
  //     if (!containerRef) return;
  //     // const { width, height } = getDimensions(containerRef);
  //     // setDimensions({ width, height });
  //     // sendImage(imgUrl);
  //   }, []);

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
