import React from 'react';
import classes from './CalendarEventsItem.module.scss';

type CalendarEventsItemProps = {
  summary: string;
  date: { date: string; dateTime: string };
};

const CalendarEventsItem = ({ summary, date }: CalendarEventsItemProps) => {
  return (
    <div className={classes.CalendarEventsItem_container}>
      <p>{summary}</p>
      <p>{date.date || date.dateTime}</p>
    </div>
  );
};

export default CalendarEventsItem;
