import { useEffect, useState, useContext } from 'react';
import classes from './CalendarEvents.module.scss';
import CalendarEventsItem from './CalendarEventsItem';
import { formatDate } from '../../utilities/utilities';
import AuthContext from '../../store/auth-context';

type TKeys = 'date' | 'dateTime';

type EventsListProps = {
  id: string;
  summary: string;
  start: { [key in TKeys]: string };
  end: { [key in TKeys]: string };
};

type EventProp = {
  id: string;
  summary: string;
  start: string;
  end: string;
};

const CalendarEvents = () => {
  const [events, setEvents] = useState<EventProp[]>();
  const [uniqueEventDates, setUniqueEventDates] = useState<string[]>();

  const authProviderCtx = useContext(AuthContext);

  const getEvents = async () => {
    console.log('test');
    const token = authProviderCtx.accessToken;
    console.log(token);

    const date = new Date();
    const formattedDate = date.toISOString();
    const nextMonth = new Date(
      new Date().setMonth(new Date().getMonth() + 1)
    ).toISOString();

    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?' +
        new URLSearchParams({
          singleEvents: 'true',
          orderBy: 'startTime',
          timeMin: formattedDate,
          timeMax: nextMonth,
        }),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Access token for google
        },
      }
    );
    const data = await response.json();

    const events = data.items.map((event: EventsListProps) => {
      const body = {
        id: event.id,
        summary: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
      };
      return body;
    });

    const eventDates = events.map((event: { start: string }) => {
      return formatDate(event.start);
    });

    const uniqueDates: string[] = [...new Set(eventDates)] as string[];
    setUniqueEventDates(uniqueDates);

    setEvents(events);
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className={classes.calendar_events_container}>
      {uniqueEventDates?.map((date) => {
        const matchingEvents = events?.filter(
          (event: EventProp) => formatDate(event.start) == date
        );
        return (
          <div key={date}>
            <p className={classes.date}>
              {date == new Date().toDateString() ? 'Today' : date}
            </p>
            {matchingEvents?.map((event) => {
              return (
                <CalendarEventsItem
                  key={event.id}
                  summary={event.summary}
                  start={event.start}
                  end={event.end}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarEvents;
