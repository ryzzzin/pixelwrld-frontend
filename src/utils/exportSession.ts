import { Canvas, createCanvas } from "canvas";
import { Session } from "../types/sessions";

export const exportSession = (session: Session) => {
  const resize = 10;
  if (!session.pixels?.length) return;

  const canvas: Canvas = createCanvas(session.width * resize, session.height * resize);

  // canvas.width = <your_canvas_width>;
  // canvas.height = <your_canvas_height>;

  const context = canvas.getContext('2d');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width * resize, canvas.height * resize);

  session.pixels.forEach((pixel) => {
    context.fillStyle = `#${pixel.color}`;
    context.fillRect(pixel.x * resize, pixel.y * resize, 1 * resize, 1 * resize);
  });

  const dataURL = canvas.toDataURL();

  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'image.png';

  link.click();
};
