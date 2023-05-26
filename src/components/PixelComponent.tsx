import React, { CSSProperties, useEffect } from 'react';
import { CreatePixelDTO, Pixel, UpdatePixelDTO } from '../types/pixels'
import s from './PixelComponent.module.scss';
import PixelsService from '../api/pixels';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentSessionState, selectedColorState } from '../recoil/game';
import { Session } from '../types/sessions';

interface Props {
  pixel: Pixel;
}

const PixelComponent: React.FC<Props> = ({ pixel }) => {
  const session = useRecoilValue(currentSessionState);
  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorState);

  const CSSVariables = {
    '--color': `#${pixel.color}`,
  } as CSSProperties;

  const isSessionExpired = () => {
    if(!session) return true;

    const currentDate = new Date().getTime();
    const endsAt = new Date(session.endsAt).getTime();

    return currentDate >= endsAt;
  }

  const savePixelRequest = () => {
    if(isSessionExpired()) return;
    
    if (pixel.id) {
      updatePixelRequest(); 
    } else {
      createPixelRequest();
    }
  }

  const updatePixelRequest = () => {
    if (!pixel.id) return; 
    const updatePixelDTO: UpdatePixelDTO = {
      ...pixel,
      color: selectedColor,
    } as UpdatePixelDTO;
    PixelsService.updatePixel(updatePixelDTO);
  };

  const createPixelRequest = () => {
    const createPixelDTO: CreatePixelDTO = {
      ...pixel,
      sessionId: session?.id,
      color: selectedColor,
    } as CreatePixelDTO;
    PixelsService.createPixel(createPixelDTO);
  }

  return (
    <div
      className={s.pixel}
      style={CSSVariables}
      onClick={savePixelRequest}
    />
  );
};

export default PixelComponent;