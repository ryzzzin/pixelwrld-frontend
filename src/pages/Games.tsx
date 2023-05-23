import React, { useEffect, useState } from 'react';
import { Session } from '../types/sessions';
import SessionsService from '../api/sessions';
import s from './Games.module.scss';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';

const Games: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    SessionsService.fetchSessions().then((response) => {
      setSessions(response.data);
    });
  }, []);

  const navigateToSession = (sessionId: number) => {
    navigate(`/games/${sessionId}`);
  };

  const navigateToCreating = () => {
    navigate(`/games/new`);
  } 

  return (
    <div className={s.games}>
      <div className={s.games__content}>
        <div className={s.games__header}>
          <h1 className={s.games__heading}>Games list</h1>
          <button className={s.games__new} onClick={navigateToCreating}>
            <svg>
              <use xlinkHref={require('../assets/all_icons.svg').default + '#plus'} />
            </svg>
            <span>New game</span>
          </button>
        </div>
        <div className={s.games__list}>
          {
            sessions.map((session) => (
              <div
                className={s.games__card}
                onClick={() => navigateToSession(session.id)}
                key={session.id}
              >
                <GameCard session={session} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Games;