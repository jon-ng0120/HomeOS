import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import classes from './CalendarEvents.module.scss';

declare const window: any;
// declare const google: any;

type EventsListProps = {
  summary: string;
  start: { date: string; dateTime: string };
};

const CalendarEvents = () => {
  const [tokenClient, setTokenClient] = useState<any>({});
  const [events, setEvents] = useState<EventsListProps[]>();
  const CLIENT_ID =
    '574368218024-73hje8pjskqgib12tfmd68s8tq5nnvss.apps.googleusercontent.com';
  const API_KEY = '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';
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  const handleCallBackResponse = async (response: any) => {
    console.log(`Encoded JWT ID Token: ${response.credential}`);
    const userObj = jwt_decode(response.credential);
    console.log(userObj);
  };

  const checkToken = () => {
    tokenClient.requestAccessToken();
  };

  const getEvents = async (token: any) => {
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
          Authorization: 'Bearer ' + token, // Access token for google
        },
      }
    );
    const data = await response.json();
    console.log(data);

    setEvents(data.items);
  };

  useEffect(() => {
    /* global google */
    const google = window.google;
    // google.accounts.id.initialize({
    //   client_id: CLIENT_ID,
    //   callback: handleCallBackResponse,
    // });

    // google.accounts.id.renderButton(document.getElementById('signInDiv'), {
    //   theme: 'outline',
    //   size: 'large',
    // });

    setTokenClient(
      google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        prompt: '',
        callback: (tokenResponse: any) => {
          if (tokenResponse && tokenResponse.access_token) {
            getEvents(tokenResponse.access_token);
          }
        },
      })
    );
    // google.accounts.id.prompt();
  }, []);

  return (
    <div className={classes.calendar_events_container}>
      <button onClick={checkToken}>Click</button>
      {events?.map((event) => {
        return (
          <>
            <p>{event.summary}</p>
            <p>{event.start.date}</p>
            <p>{event.start.dateTime}</p>
          </>
        );
      })}
    </div>
  );
};

export default CalendarEvents;
