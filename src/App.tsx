import './App.scss';
import WelcomePanel from './components/WelcomePanel';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

declare const window: any;
// declare const google: any;

function App() {
  const [tokenClient, setTokenClient] = useState<any>({});
  const CLIENT_ID =
    '574368218024-73hje8pjskqgib12tfmd68s8tq5nnvss.apps.googleusercontent.com';
  const API_KEY = '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';
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  // const handleClick = () => {
  //   gapi.load('client:auth2', () => {
  //     console.log('client loaded');
  //     gapi.client.init({
  //       apiKey: API_KEY,
  //       clientId: CLIENT_ID,
  //       discoveryDocs: DISCOVERY_DOCS,
  //       scope: SCOPES,
  //     });

  //     gapi.client.load('calendar', 'v3', () => console.log('bam!'));
  //     gapi.auth2.getAuthInstance().signIn();
  //   });
  // };

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

    await fetch(
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
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    /* global google */
    const google = window.google;
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallBackResponse,
    });

    // google.accounts.id.renderButton(document.getElementById('signInDiv'), {
    //   theme: 'outline',
    //   size: 'large',
    // });

    setTokenClient(
      google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
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
    <div className="App">
      <WelcomePanel />
      <div id="signInDiv"></div>
      <button>Sign In</button>
      <button onClick={checkToken}>Click</button>
    </div>
  );
}

export default App;
