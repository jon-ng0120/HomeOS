import { useState, useEffect, useContext } from 'react';
import Weather from '../weather/Weather';
import classes from './WelcomePanel.module.scss';

const WelcomePanel = () => {
  const [dateTime, setDateTime] = useState({});

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
      <div>
        <p className={classes.date}>{dateTime.date}</p>
        <p className={classes.time}>{dateTime.time}</p>
        <div className={classes.greeting}>
          <p>Welcome Jon</p>
        </div>
      </div>

      <Weather />
    </div>
  );
};

export default WelcomePanel;
