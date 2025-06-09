import { useCallback } from "react";
import * as fabric from "fabric";
interface UseResizeCanvasProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
}

export const useResizeCanvas = ({ canvasRef }: UseResizeCanvasProps) => {
  const resizeFabric = useCallback((newWidth: number, newHeight: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bgImage = canvas.backgroundImage as fabric.Image | null;
    if (bgImage) {
      bgImage.scaleToWidth(newWidth);
      bgImage.scaleToHeight(newHeight);
    }
    canvas.setDimensions({ width: newWidth, height: newHeight });
    canvas.renderAll();
  }, []);

  return { resizeFabric };
};
