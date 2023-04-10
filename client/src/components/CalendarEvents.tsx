import { useEffect, useState, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import classes from './CalendarEvents.module.scss';
import CalendarEventsItem from './CalendarEventsItem';
import { formatDate } from '../utilities/utilities';
import FirebaseContext from '../store/firebase-context';
import { getAuth } from 'firebase/auth';

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
  const [tokenClient, setTokenClient] = useState<any>({});
  const [events, setEvents] = useState<EventProp[]>();
  const [uniqueEventDates, setUniqueEventDates] = useState<string[]>();
  // const [token, setToken] = useState<any>('fake token');

  const firebaseProviderCtx = useContext(FirebaseContext);

  const CLIENT_ID =
    '574368218024-73hje8pjskqgib12tfmd68s8tq5nnvss.apps.googleusercontent.com';

  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  const checkToken = () => {
    tokenClient.requestAccessToken();
  };

  const getEvents = async () => {
    const token = firebaseProviderCtx.accessToken;
    console.log('TOOOKEN', token);
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

  // useEffect(() => {
  //   /* global google */
  //   const google = window.google;

  //   setTokenClient(
  //     google.accounts.oauth2.initTokenClient({
  //       client_id: CLIENT_ID,
  //       scope: SCOPES,
  //       callback: (tokenResponse: any) => {
  //         if (tokenResponse && tokenResponse.access_token) {
  //           getEvents(tokenResponse.access_token);
  //         }
  //       },
  //     })
  //   );
  //   // google.accounts.id.prompt();
  // }, []);

  return (
    <div className={classes.calendar_events_container}>
      {/* <button onClick={checkToken}>Click</button> */}
      <button onClick={getEvents}>Click</button>
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
