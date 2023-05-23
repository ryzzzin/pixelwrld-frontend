import { Pixel } from "./pixels";

export interface Session {
  id: number;
  name: string;
  width: number;
  height: number;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
  pixelsCount?: number;
  pixels?: Array<Pixel>;
};

export interface CreateSessionDTO {
  name: string;
  width: number;
  height: number;
};
