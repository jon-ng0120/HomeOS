import { useContext, useEffect } from 'react';
import './App.scss';
import CalendarEvents from './components/calendar/CalendarEvents';
import WelcomePanel from './components/welcome/WelcomePanel';
import AuthContext from './store/auth-context';
import LogOut from './components/logout/LogOut';

function App() {
  const authProviderCtx = useContext(AuthContext);

  useEffect(() => {
    const setAccessToken = async (googleId: string) => {
      getValidTokenFromServer(googleId).then(({ accessToken }) =>
        authProviderCtx.setAccessToken(accessToken)
      );
    };
    if (getGoogleIdLocalStorage() === null) {
      handleGoogleIdFromQueryParams();
    }
    const googleId: any = getGoogleIdLocalStorage();
    if (googleId !== null) {
      setAccessToken(googleId);
    }
  }, []);

  useEffect(() => {
    if (authProviderCtx.accessToken !== null) {
      authProviderCtx.setIsLoggedIn(true);
    }
  }, [authProviderCtx.accessToken]);

  const handleGoogleIdFromQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    const googleId: any = query.get('id');
    if (googleId) {
      storeGoogleIdLocalStorage(googleId);
    }
  };

  const getGoogleIdLocalStorage = () => {
    return localStorage.getItem('googleId');
  };

  const storeGoogleIdLocalStorage = (googleId: string) => {
    localStorage.setItem('googleId', googleId);
  };

  const signInHandler = async () => {
    try {
      await createGoogleAuthLink();
    } catch (error) {
      console.log(error);
    }
  };

  const createGoogleAuthLink = async () => {
    try {
      const request = await fetch('http://localhost:8080/createAuthLink', {
        method: 'POST',
      });
      const response = await request.json();
      console.log('Resposne', response);
      window.location.href = response.url;
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const getValidTokenFromServer = async (googleId: any) => {
    // get new token from server with refresh token
    try {
      const request = await fetch('http://localhost:8080/getValidToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleId,
        }),
      });
      const token = await request.json();
      console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  if (authProviderCtx.isLoggedIn) {
    return (
      <div className="App">
        <WelcomePanel />
        <CalendarEvents />
        <LogOut />
      </div>
    );
  } else {
    return <button onClick={signInHandler}>Log In</button>;
  }
}

export default App;
