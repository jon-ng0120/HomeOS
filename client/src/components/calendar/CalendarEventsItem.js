import React from 'react';
import { formatDate, formatTime } from '../../utilities/utilities';
import classes from './CalendarEventsItem.module.scss';

const CalendarEventsItem = ({ summary, start, end }) => {
  const startTime = formatTime(start);
  const endTime = formatTime(end);

  return (
    <div className={classes.calendarEventsItem_container}>
      <p className={classes.summary}>{summary}</p>
      <p className={classes.time}>
        {startTime === endTime
          ? 'All Day'
          : `${formatTime(start)} \u2013 ${formatTime(end)}`}
      </p>
    </div>
  );
};

export default CalendarEventsItem;
