// import * as fabric from "fabric";
// import { useCallback } from "react";

// export const useFabricResize = ({
//   canvasRef,
// }: {
//   canvasRef: React.RefObject<fabric.Canvas | null>;
// }) => {
//   const resizeFabric = useCallback((newWidth: number, newHeight: number) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const bgImage = canvas.backgroundImage;
//     if (bgImage) {
//       bgImage.scaleToWidth(newWidth);
//       bgImage.scaleToHeight(newHeight);
//     }
//     canvas.setDimensions({ width: newWidth, height: newHeight });
//     canvas.renderAll();
//   }, []);

//   return { resizeFabric };
// };
