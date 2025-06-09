import { useMarkup } from "@/hooks/useMarkup";
import { useEffect, useRef, useState } from "react";
import { Toolbar } from "../molecules/Toolbar";
import { getDimensions } from "@/app/lib/getSize";

import { Tool } from "@shared/types/comm-types";
import { useSocketStore } from "@/stores/socketStore";
import { CANVAS_SIZES } from "@shared/constants/canvas";

export const MarkupLayer = ({ roomId }: { roomId: string }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasElRef, markupCanvasRef, setTool } = useMarkup({
    roomId,
    width: CANVAS_SIZES["sm"].width,
    height: CANVAS_SIZES["sm"].height,
    // width: dimensions.width,
    // height: dimensions.height,
  });
  const [currentTool, setCurrentTool] = useState<Tool>("default");
  //   const [isCanvasReady, setIsCanvasReady] = useState(false);
  const { listenMarkupEvents } = useSocketStore();
  useEffect(() => {
    const { width, height } = getDimensions(containerRef);
    setDimensions({ width, height });
  }, []);

  useEffect(() => {
    if (markupCanvasRef.current) {
      listenMarkupEvents(markupCanvasRef.current);
    }
  }, [markupCanvasRef.current]);

  const handleToolChange = (prevTool: Tool, tool: Tool) => {
    if (prevTool === tool) return;

    setTool(prevTool, tool);

    // update current tool
    setCurrentTool(tool);
  };

  return (
    <div
      data-component="markup-layer"
      //   onClick={(e) => {
      //     console.log(e);

      //     updateTool("eraser");
      //   }}
      ref={containerRef}
      className={`absolute z-10 border w-[${CANVAS_SIZES["sm"].width}px] h-[${CANVAS_SIZES["sm"].height}px] `}
      //   className="absolute z-10 h-full w-full border "
    >
      <Toolbar handleToolChange={handleToolChange} prevTool={currentTool} />
      <canvas ref={canvasElRef} />
    </div>
  );
};
