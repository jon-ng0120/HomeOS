import React from 'react';
import { formatDate } from '../utilities/utilities';
import classes from './CalendarEventsItem.module.scss';

type CalendarEventsItemProps = {
  summary: string;
  start: string;
  end: string;
};

const CalendarEventsItem = ({
  summary,
  start,
  end,
}: CalendarEventsItemProps) => {
  return (
    <div className={classes.CalendarEventsItem_container}>
      <p>{summary}</p>
      {/* <p>{formatDate(start)}</p> */}
      <p>{end}</p>
    </div>
  );
};

export default CalendarEventsItem;
