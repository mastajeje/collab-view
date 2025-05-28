import { useLayoutEffect, useRef, useState } from "react";

import { getDimensions } from "@/app/lib/getSize";
import { useFabric } from "@/hooks/useFabric";
import { sendImage } from "@/sockets/events/image";
import { UploadButton } from "../atoms/UploadButton";
import { Toolbar } from "../molecules/Toolbar";

type Props = {
  imgUrl: string;
};

export default function ImageViewer({ imgUrl }: Props) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasElRef } = useFabric({
    imgUrl,
    width: dimensions.width,
    height: dimensions.height,
  });

  useLayoutEffect(() => {
    if (!containerRef) return;
    const { width, height } = getDimensions(containerRef);
    setDimensions({ width, height });
    sendImage(imgUrl);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full flex-col items-center justify-center bg-gray-100"
    >
      {/* Image Viewer */}
      <canvas ref={canvasElRef} />
      <Toolbar />
    </div>
  );
}
