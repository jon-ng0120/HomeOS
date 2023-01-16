import { useState, useEffect } from 'react';
import classes from './WelcomePanel.module.scss';

type DateTime = {
  date: string;
  time: string;
};

const WelcomePanel = () => {
  const [dateTime, setDateTime] = useState<DateTime>({} as DateTime);

  const handleFormattingDateTime = () => {
    const date = new Date();
    const time = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const month = date.toLocaleDateString('default', { month: 'long' });
    const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${dayOfWeek}, ${month} ${day} ${year}`;
    setDateTime({ date: formattedDate, time });
  };
  useEffect(() => {
    handleFormattingDateTime();
    const interval = setInterval(() => {
      handleFormattingDateTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={classes.welcome_panel_container}>
      <h1>Welcome Jon</h1>
      <p>{dateTime.date}</p>
      <p>{dateTime.time}</p>
    </div>
  );
};

export default WelcomePanel;
