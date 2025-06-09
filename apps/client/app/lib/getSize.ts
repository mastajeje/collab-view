import { LARGE, MEDIUM, SMALL } from "@shared/constants/canvas";
import { ScreenSize } from "@shared/dist";
import { RefObject } from "react";

export const getDimensions = <T extends HTMLElement>(
  ref: RefObject<T | null>,
) => {
  if (!ref.current) return { width: 0, height: 0 };
  //   const { width, height } = ref.current.getBoundingClientRect();
  const width = ref.current.clientWidth;
  const height = ref.current.clientHeight;
  return {
    width: width,
    height: height,
  };
};

export const getOptimalSize = () => {
  //   if (typeof window === "undefined") return MEDIUM;
  const width = window.innerWidth;
  if (width < 1000) {
    return SMALL;
  } else if (width < 1600) {
    return MEDIUM;
  } else {
    return LARGE;
  }
};
