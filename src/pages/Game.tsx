import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Session } from '../types/sessions';
import { Pixel } from '../types/pixels';
import SessionsService from '../api/sessions';
import { baseURL } from '../axios';
import s from './Game.module.scss';
import { useRecoilState } from 'recoil';
import { currentSessionState } from '../recoil/game';
import ColorPalette from '../components/ColorPalette';
import Field from '../components/Field';
import { useNavigate, useParams } from 'react-router-dom';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [session, setSession] = useRecoilState<Session | null>(currentSessionState);
  const [isConnected, setIsConnected] = useState(false);

  const setPixels = (newPixels: Pixel[] | undefined) => {
    setSession((oldSession) => {
      const newSession = {...oldSession} as Session;
      newSession.pixels = newPixels;
      return newSession;
    });
  };
  
  const navigateToList = () => {
    navigate(`/games`);
  };

  const savePixel = (pixel: Pixel) => {
    setSession((oldSession) => {
      const newSession = {...oldSession} as Session;
      console.log(newSession);
      
      if (!newSession?.pixels) return oldSession;

      const newPixels = [...newSession.pixels];

      const index = newPixels.findIndex((p) => p.id === pixel.id);

      if (index < 0) {
        newPixels.push(pixel);
      } else {
        newPixels[index] = pixel;
      }

      newSession.pixels = newPixels;
      
      return newSession;
    });
  }

  useEffect(() => {
    const serverUrl = baseURL;
    const socket = io(serverUrl);

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('subscribeToSessionPixels', { sessionId: sessionId });
    });

    socket.on('pixelChanged', (data) => {
      savePixel(data);
    });

    socket.on('connect_error', (err) => {
      setIsConnected(false);
      console.log(`Ошибка подключения: ${err.message}`);
    });

    socket.on('connect_timeout', () => {
      setIsConnected(false);
      console.log('Превышено время ожидания подключения');
    });

    socket.on('error', (err) => {
      setIsConnected(false);
      console.log(`Ошибка сокета: ${err.message}`);
    });

    return () => {
      socket.emit('unsubscribeFromSessionPixels', { sessionId: sessionId });
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    SessionsService.fetchSession(sessionId!).then((response) => {
      setSession(response.data);
      setPixels(response.data.pixels)
    }).catch((e) => {
      console.error(e);
      navigateToList();
    });
  }, [])

  const navigateToGamesList = () => {
    navigate('/games');
  }

  return (
    <div className={s.game}>
      <div className={s.game__content}>
        <div className={[s.game__header, s.header].join(' ')}>
          <div className={s.header__left}>
            <button className={s.game__back} onClick={navigateToGamesList}>
              <svg>
                <use xlinkHref={require('../assets/all_icons.svg').default + '#back'} />
              </svg>
              <span>Back</span>
            </button>
          </div>
          <div className={s.header__center}>
            <h1 className={s.game__heading}>
              { `Session "${session?.name}"` }
            </h1>
          </div>
          <div className={s.header__right}/>
        </div>
        <div className={s.game__field}>
          {isConnected && session ? (
            <Field session={session} />
          ) : (
            <p>Не удалось подключиться к серверу WebSocket.</p>
          )}
        </div>
        <div className={s.game__palette}>
          <ColorPalette />
        </div>
      </div>
    </div>
  );
};

export default Game;
