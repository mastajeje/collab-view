import { useCallback } from "react";
import * as fabric from "fabric";
import { CustomFabricObject } from "@/types/types";
interface UseResizeCanvasProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const useResizeCanvas = ({ canvasRef }: UseResizeCanvasProps) => {
  const resizeFabric = useCallback((newWidth: number, newHeight: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setDimensions({ width: newWidth, height: newHeight });

    const resizeObject = (target: CustomFabricObject) => {
      const { leftRatio, topRatio, originCanvasWidth, originCanvasHeight } =
        target.data;
      const isImage = target.isType("image");
      const newScaleX = newWidth / originCanvasWidth;
      const newScaleY = newHeight / originCanvasHeight;

      const baseProps = {
        scaleX: target.scaleX * newScaleX,
        scaleY: target.scaleY * newScaleY,
        data: {
          ...target.data,
          originCanvasWidth: newWidth,
          originCanvasHeight: newHeight,
        },
      };
      if (isImage) {
        return {
          ...baseProps,
          left: target.left * newScaleX,
          top: target.top * newScaleY,
        };
      }
      return {
        ...baseProps,
        left: leftRatio * newWidth,
        top: topRatio * newHeight,
      };
    };

    canvas.getObjects().forEach((obj) => {
      const target = obj as CustomFabricObject;
      const newObject = resizeObject(target);
      target.set(newObject);
      target.setCoords();
    });

    // canvas.getObjects().forEach((obj) => {
    //   const target = obj as CustomFabricObject;
    //   const { leftRatio, topRatio, originCanvasWidth, originCanvasHeight } =
    //     target.data;
    //   const isImage = target.isType("image");
    //   const newScaleX = newWidth / originCanvasWidth;
    //   const newScaleY = newHeight / originCanvasHeight;
    //   //   target.data.originCanvasWidth = newWidth;
    //   //   target.data.originCanvasHeight = newHeight;
    //   if (!isImage) {
    //     target.set({
    //       left: leftRatio * newWidth,
    //       top: topRatio * newHeight,
    //       scaleX: target.scaleX * newScaleX,
    //       scaleY: target.scaleY * newScaleY,
    //       data: {
    //         ...target.data,
    //         originCanvasWidth: newWidth,
    //         originCanvasHeight: newHeight,
    //       },
    //     });
    //     target.setCoords();
    //   }
    //   if (isImage) {
    //     target.set({
    //       data: {
    //         originCanvasWidth: newWidth,
    //         originCanvasHeight: newHeight,
    //       },

    //       left: target.left * newScaleX,
    //       top: target.top * newScaleY,
    //       scaleX: target.scaleX * newScaleX,
    //       scaleY: target.scaleY * newScaleY,
    //     });
    //   }
    // });

    canvas.requestRenderAll();
  }, []);

  return { resizeFabric };
};
