import { Tool } from "@shared/types/comm-types";
import * as fabric from "fabric";
// import { v4 as uuidv4 } from "uuid";
interface ToolHelper {
  on: (canvas: fabric.Canvas) => void;
  off: (canvas: fabric.Canvas) => void;
  handler?: null | ((e: any) => void);
}

export const toolHelpers: Record<Tool, ToolHelper> = {
  default: {
    on: (canvas) => {
      canvas.isDrawingMode = false;
    },
    off: (canvas) => {
      canvas.isDrawingMode = false;
    },
  },
  pen: {
    on: (canvas) => {
      canvas.isDrawingMode = true;
      const brush = new fabric.PencilBrush(canvas);
      brush.color = "black";
      brush.width = 5;
      canvas.freeDrawingBrush = brush;

      canvas.on("path:created", (e) => {
        const path = e.path;
        // path.id = uuidv4();
        path.selectable = false;
        path.hoverCursor = "default";
      });
    },
    off: (canvas) => {
      canvas.isDrawingMode = false;
      canvas.off("path:created");
    },
  },
  text: {
    handler: null,
    on: (canvas) => {
      disableSelection(canvas);

      toolHelpers.text.handler = (e: any) => handleTextInsert(e, canvas);
      canvas.on("mouse:up", toolHelpers.text.handler);
    },
    off: (canvas) => {
      if (toolHelpers.text.handler) {
        enableSelection(canvas);
        canvas.off("mouse:up", toolHelpers.text.handler);
      }
    },
  },
  eraser: {
    handler: null,
    on: (canvas) => {
      canvas.isDrawingMode = false;
      canvas.selection = false;

      let isMouseDown = false;

      // eraser on
      canvas.on("mouse:down", (e) => {
        isMouseDown = true;
        const pointer = canvas.getViewportPoint(e.e);
        removeObject(pointer, canvas);
      });

      // eraser move
      canvas.on("mouse:move", (e) => {
        if (!isMouseDown) return;

        const pointer = canvas.getViewportPoint(e.e);
        removeObject(pointer, canvas);
      });

      // eraser off
      canvas.on("mouse:up", (e) => {
        isMouseDown = false;
      });
    },
    off: (canvas) => {
      canvas.off("mouse:down");
      canvas.off("mouse:move");
      canvas.off("mouse:up");
    },
  },
};

const removeObject = (pointer: fabric.Point, canvas: fabric.Canvas) => {
  const objects = canvas.getObjects();

  for (let i = objects.length - 1; i >= 0; i--) {
    const obj = objects[i];
    if (obj.isType("image")) return;
    if (obj.containsPoint(pointer)) {
      canvas.remove(obj);
      canvas.renderAll();
      break;
    }
  }
};

// fabric.IEvnet error로 인해 any로 처리
const handleTextInsert = (e: any, canvas: fabric.Canvas) => {
  const pointer = canvas.getViewportPoint(e.e);
  if (e.target) return;
  const text = new fabric.IText("텍스트 입력", {
    left: pointer.x,
    top: pointer.y,
    fontSize: 16,
    fill: "black",
  });
  canvas.add(text);
  canvas.setActiveObject(text);
};

const disableSelection = (canvas: fabric.Canvas) => {
  canvas.getObjects().forEach((obj) => {
    obj.selectable = false;
    obj.evented = false;
  });
};

const enableSelection = (canvas: fabric.Canvas) => {
  canvas.getObjects().forEach((obj) => {
    obj.selectable = true;
    obj.evented = true;
  });
};
