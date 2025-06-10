"use client";

import { log } from "comm-utils";
import * as fabric from "fabric";
import { useEffect, useRef } from "react";

type UseFabricOptions = {
  imgUrl?: string;
  width?: number;
  height?: number;
};

export const useFabric = ({
  imgUrl = "/next.svg",
  width = 800,
  height = 600,
}: UseFabricOptions) => {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasElRef.current || !width || !height) return;
    // log("useFabric", width, height);
    const canvas = new fabric.Canvas(canvasElRef.current, {
      width,
      height,
      //   width,
      //   height,
      backgroundColor: "blue",
      selection: true,
      evented: true,
    });

    fabricCanvasRef.current = canvas;

    initImage(imgUrl, width, height, canvas);

    return () => {
      canvas.dispose();
    };
  }, [imgUrl, width, height]);

  return {
    fabricCanvasRef,
    canvasElRef,
  };
};

const initImage = async (
  url: string,
  width: number,
  height: number,
  canvas: fabric.Canvas,
) => {
  const img = await fabric.FabricImage.fromURL(url, { crossOrigin: null });

  img.selectable = true;

  // Scale to fit inside the canvas
  img.scaleToWidth(width);
  if (img.getScaledHeight() > height) {
    img.scaleToHeight(height);
  }

  img.set({
    left: (width - img.getScaledWidth()) / 2,
    top: (height - img.getScaledHeight()) / 2,
  });

  //   img.centeredScaling = true;
  //   img.center();
  canvas.add(img);
  canvas.sendObjectToBack(img);
  canvas.renderAll();
};
