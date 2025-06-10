import { useCallback } from "react";
import * as fabric from "fabric";
interface UseResizeCanvasProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
}
interface CustomFabricObject extends fabric.Object {
  id: string;
  data: {
    leftRatio: number;
    topRatio: number;
  };
}

export const useResizeCanvas = ({ canvasRef }: UseResizeCanvasProps) => {
  const resizeFabric = useCallback((newWidth: number, newHeight: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // const bgImage = canvas.backgroundImage as fabric.Image | null;
    // if (bgImage) {
    //   bgImage.scaleToWidth(newWidth);
    //   bgImage.scaleToHeight(newHeight);
    // }
    canvas.setDimensions({ width: newWidth, height: newHeight });
    canvas.renderAll();
  }, []);

  const resizeMarkupLayer = useCallback(
    (newWidth: number, newHeight: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.setDimensions({ width: newWidth, height: newHeight });

      canvas.getObjects().forEach((obj) => {
        const target = obj as CustomFabricObject;
        const leftRatio = target.get("leftRatio");
        const topRatio = target.get("topRatio");
        if (!leftRatio || !topRatio) return;
        target.left = leftRatio * newWidth;
        target.top = topRatio * newHeight;
        obj.setCoords();
      });

      canvas.renderAll();
      console.log("resizeMarkupLayer", canvas.getObjects().length);
    },
    [],
  );

  return { resizeFabric, resizeMarkupLayer };
};
