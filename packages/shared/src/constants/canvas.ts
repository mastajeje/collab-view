export const CANVAS_SIZES = {
  sm: {
    width: 800,
    height: 600,
  },
  md: {
    width: 1280,
    height: 720,
  },
  lg: {
    width: 1920,
    height: 1080,
  },
} as const;

export const SMALL = 'sm';
export const MEDIUM = 'md';
export const LARGE = 'lg';

export type CanvasSize = keyof typeof CANVAS_SIZES;
