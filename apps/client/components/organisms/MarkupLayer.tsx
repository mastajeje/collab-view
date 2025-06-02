import { useMarkup } from "@/hooks/useMarkup";
import { useEffect, useState } from "react";

export const MarkupLayer = () => {
  const { containerRef, setTool } = useMarkup({ roomId: "1" });
  const [tool, updateTool] = useState<"select" | "pen" | "text" | "eraser">(
    "pen",
  );

  useEffect(() => {
    setTool(tool);
  }, [tool]);

  return (
    <div
      onClick={(e) => {
        console.log(e);

        updateTool("eraser");
      }}
      ref={containerRef}
      className="absolute z-20 h-full w-full border"
    ></div>

    // <div>
    //   <div ref={containerRef} className="w-full border h-full"></div>
    // </div>
  );
};
