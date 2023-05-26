import React, { useState, useEffect } from 'react';
import s from './Timer.module.scss';

interface Props {
  endsAt: string;
}

const Timer: React.FC<Props> = ({ endsAt }) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  function getTimeRemaining() {
    const currentDate = new Date().getTime();
    const endDate = new Date(endsAt);

    if (currentDate > endDate.getTime()) return { expired: true };

    const totalSeconds = Math.floor((endDate.getTime() - Date.now()) / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      expired: false,
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0')
    };
  }

  return (
    <div className={s.timer}>
      {
        timeRemaining.expired
          ? 'Game ended'
          : (
            `${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`
          )
      }
    </div>
  );
};

export default Timer;
