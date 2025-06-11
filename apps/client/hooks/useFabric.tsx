"use client";

import { log } from "comm-utils";
import * as fabric from "fabric";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface CustomFabricImage extends fabric.Image {
  id: string;
  data: {
    leftRatio: number;
    topRatio: number;
    originCanvasWidth: number;
    originCanvasHeight: number;
    // widthRatio: number;
    // heightRatio: number;
  };
}

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
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasElRef.current || fabricCanvasRef.current || !width || !height)
      return;
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

    initImage(imgUrl, width, height, canvas).then(() => {
      setIsCanvasReady(true);
    });

    // return () => {
    //   canvas.dispose();
    // };
  }, [imgUrl, width, height]);

  return {
    fabricCanvasRef,
    canvasElRef,
    isCanvasReady,
  };
};

const initImage = async (
  url: string,
  width: number,
  height: number,
  canvas: fabric.Canvas,
) => {
  const img = (await fabric.FabricImage.fromURL(url, {
    crossOrigin: null,
  })) as CustomFabricImage;

  // Scale to fit inside the canvas
  img.scaleToWidth(width);
  if (img.getScaledHeight() > height) {
    img.scaleToHeight(height);
  }

  img.set({
    left: (width - img.getScaledWidth()) / 2,
    top: (height - img.getScaledHeight()) / 2,
  });

  img.selectable = false;
  img.data = {
    leftRatio: (width - img.getScaledWidth()) / 2 / width,
    topRatio: (height - img.getScaledHeight()) / 2 / height,
    // widthRatio: img.width / width,
    // heightRatio: img.height / height,
    originCanvasWidth: width,
    originCanvasHeight: height,
  };
  img.id = uuidv4();

  canvas.add(img);
  canvas.sendObjectToBack(img);
  canvas.renderAll();
};
