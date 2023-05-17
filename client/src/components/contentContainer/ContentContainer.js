import React from 'react';
import CalendarEvents from '../calendar/CalendarEvents';
import classes from './ContentContainer.module.scss';
import NewsGrid from '../news/NewsGrid';

const ContentContainer = () => {
  return (
    <div>
      <span className={`material-icons ${classes.tab_option}`}>
        calendar_month
      </span>
      <span className={`material-icons ${classes.tab_option}`}>feed</span>
      <CalendarEvents />
      <NewsGrid />
    </div>
  );
};

export default ContentContainer;
