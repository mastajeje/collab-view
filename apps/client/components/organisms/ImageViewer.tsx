import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { getDimensions } from "@/app/lib/getSize";
import { useFabric } from "@/hooks/useFabric";
import { sendImage } from "@/sockets/events/image";
import { CANVAS_SIZES } from "@shared/constants/canvas";
import { useScreenStore } from "@/stores/screenStore";
import { useResizeCanvas } from "@/hooks/useResizeCanvas";

type Props = {
  imgUrl: string;
};

export default function ImageViewer({ imgUrl }: Props) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { screenSize } = useScreenStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasElRef, fabricCanvasRef } = useFabric({
    imgUrl,
    width: dimensions.width,
    height: dimensions.height,
    // width: dimensions.width,
    // height: dimensions.height,
  });
  const { resizeFabric } = useResizeCanvas({ canvasRef: fabricCanvasRef });

  //   useEffect(() => {
  //     if (!containerRef) return;
  //     // const { width, height } = getDimensions(containerRef);
  //     // setDimensions({ width, height });
  //     // sendImage(imgUrl);
  //   }, []);

  useEffect(() => {
    if (!containerRef) return;
    if (screenSize === null) return;
    setDimensions({
      width: CANVAS_SIZES[screenSize].width,
      height: CANVAS_SIZES[screenSize].height,
    });
    resizeFabric(
      CANVAS_SIZES[screenSize].width,
      CANVAS_SIZES[screenSize].height,
    );
  }, [screenSize]);

  return (
    <div
      ref={containerRef}
      data-component="image-viewer"
      className="flex h-full w-full flex-col items-center justify-center bg-gray-100"
    >
      {/* Image Viewer */}
      <canvas ref={canvasElRef} />
    </div>
  );
}
