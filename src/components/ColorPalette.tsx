import React, { CSSProperties } from 'react';
import s from './ColorPalette.module.scss';
import { useRecoilState } from 'recoil';
import { selectedColorState } from '../recoil/game';
import { paletteColors } from '../utils/paletteColors';

const ColorPalette: React.FC = () => {
  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorState);

  const getColorStyle = (color: string): CSSProperties => {
    const style = {
      '--color': `#${color}`,
    } as CSSProperties;
    return style;
  };

  const selectColor = (color: string) => {
    console.log(color);
    setSelectedColor(color);
    console.log(selectedColor);
  }

  return (
    <div className={s.palette}>
      {
        paletteColors.map((color) => (
          <button
            className={[s.palette__color, (selectedColor === color) ? s.palette__color_selected : ''].join(' ')}
            style={getColorStyle(color)}
            onClick={() => selectColor(color)}
          />
        ))
      }
    </div>
  );
};

export default ColorPalette;