import { useMarkup } from "@/hooks/useMarkup";
import { useEffect, useRef, useState } from "react";
import { Toolbar } from "../molecules/Toolbar";
import { getDimensions } from "@/app/lib/getSize";

import { Tool } from "@shared/types/comm-types";
import { useSocketStore } from "@/stores/socketStore";
import { CANVAS_SIZES } from "@shared/constants/canvas";
import { useResizeCanvas } from "@/hooks/useResizeCanvas";
import { useScreenStore } from "@/stores/screenStore";

export const MarkupLayer = ({ roomId }: { roomId: string }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { screenSize } = useScreenStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasElRef, markupCanvasRef, setTool } = useMarkup({
    roomId,
    width: dimensions.width,
    height: dimensions.height,
    // width: dimensions.width,
    // height: dimensions.height,
  });
  const { resizeMarkupLayer } = useResizeCanvas({ canvasRef: markupCanvasRef });

  const [currentTool, setCurrentTool] = useState<Tool>("default");
  //   const [isCanvasReady, setIsCanvasReady] = useState(false);
  const { listenMarkupEvents } = useSocketStore();
  //   useEffect(() => {
  //     const { width, height } = getDimensions(containerRef);
  //     setDimensions({ width, height });
  //   }, []);

  useEffect(() => {
    if (markupCanvasRef.current) {
      listenMarkupEvents(markupCanvasRef.current);
    }
  }, [markupCanvasRef.current]);

  useEffect(() => {
    if (screenSize) {
      setDimensions({
        width: CANVAS_SIZES[screenSize].width,
        height: CANVAS_SIZES[screenSize].height,
      });

      //   resizeMarkupLayer(
      //     CANVAS_SIZES[screenSize].width,
      //     CANVAS_SIZES[screenSize].height,
      //   );
    }
  }, [screenSize]);

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
      className={`absolute z-10 h-full w-full border border-blue-400`}
      //   className={`absolute z-10 border border-blue-400 w-[${CANVAS_SIZES["sm"].width}px] h-[${CANVAS_SIZES["sm"].height}px] `}
      //   className="absolute z-10 h-full w-full border "
    >
      <Toolbar handleToolChange={handleToolChange} prevTool={currentTool} />
      <canvas ref={canvasElRef} />
    </div>
  );
};
