import { useState, useEffect } from 'react';
import CalendarEvents from '../calendar/CalendarEvents';
import classes from './ContentContainer.module.scss';
import NewsGrid from '../news/NewsGrid';

const ContentContainer = () => {
  const [view, setView] = useState(<CalendarEvents />);

  return (
    <div className={classes.content_container}>
      <div className={classes.tabs}>
        <div
          data-content-type="calendar"
          className={`material-icons ${classes.tab_option}`}
          onClick={() => setView(<CalendarEvents />)}
        >
          calendar_month
        </div>
        <div
          data-content-type="news"
          className={`material-icons ${classes.tab_option}`}
          onClick={() => setView(<NewsGrid />)}
        >
          feed
        </div>
      </div>

      {view}
    </div>
  );
};

export default ContentContainer;
