import * as fabric from "fabric";

export interface CustomFabricObject extends fabric.Object {
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
