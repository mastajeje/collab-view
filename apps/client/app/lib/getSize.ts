import { RefObject } from "react";

export const getDimensions = <T extends HTMLElement>(
  ref: RefObject<T | null>,
) => {
  if (!ref.current) return { width: 0, height: 0 };
  const { width, height } = ref.current.getBoundingClientRect();
  return { width, height };
};
