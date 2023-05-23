import React, { useMemo } from 'react';
import { Session } from '../types/sessions';
import PixelComponent from './PixelComponent';
import { Pixel } from '../types/pixels';
import s from './Field.module.scss';

interface Props {
  session: Session;
};

const Field: React.FC<Props> = ({session}) => {
  const findPixelByCoordinates = (x: number, y: number) => {
    return session.pixels?.find((p) => (p.x === x && p.y === y));
  }

  const pixels: Pixel[][] = useMemo(() => (
    Array.from({length: session.height}, (_, i) => {
      const row = Array.from({length: session.width}, (_, j) => {
        const foundPixel = findPixelByCoordinates(i, j);
        console.log(foundPixel);
        
        if (foundPixel) return foundPixel;

        const pixel: Pixel = {
          x: i,
          y: j,
          color: 'FFFFFF',
        };
        return pixel;
      });
      return row;
    })
  ), [session]);

  console.log(pixels);

  return (
    <div className={s.field}>
      <div className={s.field__pixels}>
        {pixels.map((row) => (
          <div className={s.field__row} key={row[0].x}>
            {
              row.map((pixel) => (
                <PixelComponent pixel={pixel} key={`${pixel.x}${pixel.y}`}/>
              ))
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Field;