import { useState, useEffect } from 'react';
import CalendarEvents from '../calendar/CalendarEvents';
import classes from './ContentContainer.module.scss';
import NewsGrid from '../news/NewsGrid';

const ContentContainer = () => {
  const [view, setView] = useState({
    view: 'calendar',
    path: <CalendarEvents />,
  });

  return (
    <div className={classes.content_container}>
      <div className={classes.tabs}>
        <p
          className={`${classes.tab_option} ${
            view.view === 'calendar' ? classes.active : ''
          }`}
          onClick={() =>
            setView({
              view: 'calendar',
              path: <CalendarEvents />,
            })
          }
        >
          Calendar
        </p>
        <p
          className={`${classes.tab_option} ${
            view.view === 'news' ? classes.active : ''
          }`}
          onClick={() =>
            setView({
              view: 'news',
              path: <NewsGrid />,
            })
          }
        >
          News
        </p>
      </div>

      {view.path}
    </div>
  );
};

export default ContentContainer;
