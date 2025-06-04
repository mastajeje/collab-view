import { useMarkup } from "@/hooks/useMarkup";
import { useEffect, useRef, useState } from "react";
import { Toolbar } from "../molecules/Toolbar";
import { getDimensions } from "@/app/lib/getSize";

import { Tool } from "@shared/types/comm-types";
export const MarkupLayer = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  //   const { containerRef, setTool } = useMarkup({
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasElRef, setTool } = useMarkup({
    roomId: "1",
    width: dimensions.width,
    height: dimensions.height,
  });
  const [currentTool, setCurrentTool] = useState<Tool>("default");

  const currentToolRef = useRef<Tool>("default");

  useEffect(() => {
    const { width, height } = getDimensions(containerRef);
    setDimensions({ width, height });
  }, []);

  //   useEffect(() => {
  //     if (dimensions.width === 0 || dimensions.height === 0) return;
  //     setTool(tool);
  //   }, [dimensions]);

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
      className="absolute z-10 h-full w-full border"
    >
      <Toolbar handleToolChange={handleToolChange} prevTool={currentTool} />
      <canvas ref={canvasElRef} />
    </div>
  );
};
