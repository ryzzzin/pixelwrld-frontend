export interface Pixel {
  id?: number;
  color: string;
  x: number;
  y: number;
};

export interface CreatePixelDTO {
  sessionId: number;
  color: string;
  x: number;
  y: number;
};

export interface UpdatePixelDTO {
  id: number;
  color?: string;
  x?: number;
  y?: number;
};
