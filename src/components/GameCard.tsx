import React from 'react';
import { Session } from '../types/sessions';
import s from './GameCard.module.scss';

interface Props {
  session: Session;
}

const GameCard: React.FC<Props> = ({ session }) => {
  const formatEndsIn = (dateString: string): string => {
    const targetDate = new Date(dateString);
    const currentDate = new Date();
  
    const timeDifferenceMs = targetDate.getTime() - currentDate.getTime();
    const timeDifferenceMinutes = Math.ceil(timeDifferenceMs / (1000 * 60));
    const timeDifferenceHours = Math.ceil(timeDifferenceMinutes / 60);
    const timeDifferenceDays = Math.ceil(timeDifferenceHours / 24);
  
    if (timeDifferenceHours <= 0) {
      return 'Expired';
    } else if (timeDifferenceHours < 1) {
      return `Ends in ${timeDifferenceMinutes} minutes`;
    } else if (timeDifferenceHours < 24) {
      return `Ends in ${timeDifferenceHours} hours`;
    } else {
      return `Ends in ${timeDifferenceDays} days`;
    }
  };

  const getPixelsCount = () => {
    if (!session.pixelsCount || session.pixelsCount === 0){
      return 'No pixels';
    }
    
    if (session.pixelsCount === 1){
      return '1 pixel';
    }

    return `${session.pixelsCount} pixels`;
  }

  return (
    <div className={s.card}>
      <div className={s.card__left}>
        <div className={s.card__name}>
          { session.name }
        </div>
        <div className={s.card__pixels}>
          <img src={require('../assets/logo.png')} alt="logo" />
          <span className={s.card__subtitle}>
            {
              getPixelsCount()
            }
          </span>
        </div>
      </div>
      <div className={s.card__right}>
        <div className={s.card__subtitle}>
          { formatEndsIn(session.endsAt) }
        </div>
        <div className={s.card__subtitle}>
          { `${session.width}×${session.height}` }
        </div>
      </div>
    </div>
  );
};

export default GameCard;