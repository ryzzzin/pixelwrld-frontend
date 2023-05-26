import React, { useEffect, useState } from 'react';
import { CreateSessionDTO, Session } from '../types/sessions';
import SessionsService from '../api/sessions';
import s from './NewGame.module.scss';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';

const NewGame: React.FC = () => {
  const navigate = useNavigate();
  const [newSession, setNewSession] = useState<CreateSessionDTO>({
    name: '',
    width: 0,
    height: 0,
    endsAt: new Date().toString(),
  });

  const minEndsAtDate = new Date();
  const maxEndsAtDate = new Date();
  maxEndsAtDate.setDate(maxEndsAtDate.getDate() + 31);

  const navigateToSession = (sessionId: number) => {
    navigate(`/games/${sessionId}`);
  };

  const navigateToList = () => {
    navigate(`/games`);
  };

  const createSessionRequest = () => {
    SessionsService.createSession(newSession).then((response) => {
      navigateToSession(response.data.id);
    })
  }

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSessionRequest();
  }

  return (
    <div className={s.games}>
      <div className={s.games__content}>
        <div className={s.games__header}>
          <h1 className={s.games__heading}>New game</h1>
          <button className={s.games__new} onClick={navigateToList}>
            <svg>
              <use xlinkHref={require('../assets/all_icons.svg').default + '#list'} />
            </svg>
            <span>List</span>
          </button>
        </div>
        <form className={[s.games__form, s.form].join(' ')} onSubmit={formSubmitHandler}>
          <div className={s.form__row}>
            <Input
              className={s.form__input}
              placeholder='Name'
              value={newSession.name}
              setValue={(v) => setNewSession({ ...newSession, name: v })}
              required
              minLength={3}
              maxLength={50}
            />
            <Input
              className={s.form__input_s}
              type='number'
              placeholder='Width'
              value={newSession.width.toString()}
              setValue={(v) => setNewSession({ ...newSession, width: parseInt(v) })}
              required
              min={1}
              max={32}
            />
            <Input
              className={s.form__input_s}
              type='number'
              placeholder='Height'
              value={newSession.height.toString()}
              setValue={(v) => setNewSession({ ...newSession, height: parseInt(v) })}
              required
              min={1}
              max={32}
            />
          </div>
          <div className={s.form__row}>
            <Input
              type='datetime-local'
              className={s.form__input}
              placeholder='Name'
              value={newSession.endsAt}
              setValue={(v) => setNewSession({ ...newSession, endsAt: v })}
              min={minEndsAtDate.toISOString().slice(0, 16)}
              max={maxEndsAtDate.toISOString().slice(0, 16)}
              required
            />
          </div>
          <button className={s.form__button}>
            <svg>
              <use xlinkHref={require('../assets/all_icons.svg').default + '#plus'} />
            </svg>
            <span>
              Create
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewGame;