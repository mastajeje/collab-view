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
  data: {
    leftRatio: number;
    topRatio: number;
  };
}

type UseMarkupProps = {
  roomId: string;
  fabricCanvasRef: React.RefObject<fabric.Canvas | null>;
  width: number;
  height: number;
};

export const useMarkup = ({
  roomId,
  fabricCanvasRef,
  width,
  height,
}: UseMarkupProps) => {
  useEffect(() => {
    const fabricCanvas = fabricCanvasRef.current;

    if (!fabricCanvas) return;
    // Add a unique id to the object when it is added to the canvas
    fabricCanvas.on("object:added", (e) => {
      const target = e.target as CustomFabricObject;
      if (target.id) return;
      target.id = uuidv4();
      target.data = {
        leftRatio: target.left / width,
        topRatio: target.top / height,
      };

      emitMarkupAdd(roomId, target.toObject(["id"]) as CustomFabricObject);
      console.log(e.target);
    });

    fabricCanvas.on("object:modified", (e) => {
      if (e.target) {
        console.log("modified", e.target);
        emitMarkupEdit(roomId, e.target.toObject(["id"]) as CustomFabricObject);
      }
    });

    fabricCanvas.on("object:removed", (e) => {
      if (e.target) {
        console.log("removed", e.target);
        emitMarkupDelete(roomId, (e.target as CustomFabricObject).id);
      }
    });

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Handle size changes separately
  useEffect(() => {
    const fabricCanvas = fabricCanvasRef.current;
    if (!fabricCanvas) return;

    fabricCanvas.setDimensions({ width, height });
    // Update existing objects' positions based on new dimensions
    fabricCanvas.getObjects().forEach((obj) => {
      const target = obj as CustomFabricObject;

      const leftRatio = target.data.leftRatio;
      const topRatio = target.data.topRatio;
      if (!leftRatio || !topRatio) return;
      const scaleX = target.scaleX || 1;
      const scaleY = target.scaleY || 1;
      //   const leftRatio = target.get("leftRatio");
      //   const topRatio = target.get("topRatio");

      //   target.left = leftRatio * width;
      //   target.top = topRatio * height;
      //   target.scaleX = target.scaleX * (leftRatio / width);
      //   target.scaleY = target.scaleY * (topRatio / height);
      //   target.setCoords();
      target.set({
        leftRatio: leftRatio * width,
        topRatio: topRatio * height,
        scaleX: scaleX,
        scaleY: scaleY,
      });
    });
    fabricCanvas.renderAll();
  }, [width, height]);

  const setTool = (prevTool: Tool, tool: Tool) => {
    const fabricCanvas = fabricCanvasRef.current;
    if (!fabricCanvas) return;

    if (!fabricCanvas) return;
    toolHelpers[prevTool].off(fabricCanvas);
    toolHelpers[tool].on(fabricCanvas);
  };

  return {
    // containerRef,
    // markupCanvasRef,
    // canvasElRef,
    setTool,
  };
};
// import { useEffect, useRef } from "react";
// import * as fabric from "fabric";
// import { toolHelpers } from "@/app/lib/toolHelpers";
// import { Tool } from "@shared/types/comm-types";
// import { v4 as uuidv4 } from "uuid";
// import {
//   emitMarkupAdd,
//   emitMarkupDelete,
//   emitMarkupEdit,
// } from "@/sockets/events/markup";
// // Define a custom type that extends FabricObject
// interface CustomFabricObject extends fabric.Object {
//   id: string;
//   data: {
//     leftRatio: number;
//     topRatio: number;
//   };
// }

// type UseMarkupProps = {
//   roomId: string;
//   width: number;
//   height: number;
// };

// export const useMarkup = ({ roomId, width, height }: UseMarkupProps) => {
//   const markupCanvasRef = useRef<fabric.Canvas | null>(null);
//   const canvasElRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     console.log("useMarkup", width, height);
//     if (!canvasElRef.current) return;
//     const markupCanvas = new fabric.Canvas(canvasElRef.current, {
//       width,
//       height,
//       selection: false,
//       //   backgroundColor: "green",
//     });

//     markupCanvasRef.current = markupCanvas;

//     // Add a unique id to the object when it is added to the canvas
//     markupCanvas.on("object:added", (e) => {
//       const target = e.target as CustomFabricObject;
//       if (target.id) return;
//       target.id = uuidv4();
//       target.data = {
//         leftRatio: target.left / width,
//         topRatio: target.top / height,
//       };
//       //   target.set("leftRatio", target.left / width);
//       //   target.set("topRatio", target.top / height);
//       emitMarkupAdd(roomId, target.toObject(["id"]) as CustomFabricObject);
//       console.log(e.target);
//     });

//     markupCanvas.on("object:modified", (e) => {
//       if (e.target) {
//         console.log("modified", e.target);
//         emitMarkupEdit(roomId, e.target.toObject(["id"]) as CustomFabricObject);
//       }
//     });

//     markupCanvas.on("object:removed", (e) => {
//       if (e.target) {
//         console.log("removed", e.target);
//         emitMarkupDelete(roomId, (e.target as CustomFabricObject).id);
//       }
//     });

//     return () => {
//       markupCanvas.dispose();
//     };
//   }, []);

//   // Handle size changes separately
//   useEffect(() => {
//     const canvas = markupCanvasRef.current;
//     if (!canvas) return;

//     canvas.setDimensions({ width, height });
//     // Update existing objects' positions based on new dimensions
//     canvas.getObjects().forEach((obj) => {
//       const target = obj as CustomFabricObject;

//       const leftRatio = target.data.leftRatio;
//       const topRatio = target.data.topRatio;
//       if (!leftRatio || !topRatio) return;
//       const scaleX = target.scaleX || 1;
//       const scaleY = target.scaleY || 1;
//       //   const leftRatio = target.get("leftRatio");
//       //   const topRatio = target.get("topRatio");

//       //   target.left = leftRatio * width;
//       //   target.top = topRatio * height;
//       //   target.scaleX = target.scaleX * (leftRatio / width);
//       //   target.scaleY = target.scaleY * (topRatio / height);
//       //   target.setCoords();
//       target.set({
//         leftRatio: leftRatio * width,
//         topRatio: topRatio * height,
//         scaleX: scaleX,
//         scaleY: scaleY,
//       });
//     });
//     canvas.renderAll();
//   }, [width, height]);

//   const setTool = (prevTool: Tool, tool: Tool) => {
//     const canvas = markupCanvasRef.current;
//     if (!canvas) return;

//     if (!canvas) return;
//     toolHelpers[prevTool].off(canvas);
//     toolHelpers[tool].on(canvas);
//   };

//   return {
//     // containerRef,
//     markupCanvasRef,
//     canvasElRef,
//     setTool,
//   };
// };
