import { Tool } from "@shared/types/comm-types";
import IconButton from "../atoms/IconButton";
import { EraserIcon } from "../Icons/EraserIcon";
import { PenIcon } from "../Icons/PenIcon";
import { TextIcon } from "../Icons/TextIcon";

// type Tool = "select" | "pen" | "text" | "eraser";

export const Toolbar = ({
  handleToolChange,
  prevTool,
}: {
  handleToolChange: (prevTool: Tool, tool: Tool) => void;
  prevTool: Tool;
}) => {
  return (
    <div className="absolute bottom-2 left-1/2 z-20 flex w-fit -translate-x-1/2 flex-row gap-2 rounded-lg bg-white p-1.5">
      <IconButton
        icon={<PenIcon />}
        backgroundColor="bg-transparent"
        size="sm"
        onClick={() => handleToolChange(prevTool, "pen")}
      />
      <IconButton
        icon={<TextIcon color="black" BGColor="white" size={24} />}
        backgroundColor="bg-transparent"
        size="sm"
        onClick={() => handleToolChange(prevTool, "text")}
      />
      <IconButton
        icon={<EraserIcon color="black" size={24} />}
        backgroundColor="bg-transparent"
        size="sm"
        onClick={() => handleToolChange(prevTool, "eraser")}
      />
    </div>
  );
};
