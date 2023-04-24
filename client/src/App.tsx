import { useContext, useEffect } from 'react';
import './App.scss';
import CalendarEvents from './components/calendar/CalendarEvents';
import WelcomePanel from './components/welcome/WelcomePanel';
import AuthContext from './store/auth-context';
import Profile from './components/profile/Profile';
import WebsitesContainer from './components/websites/WebsitesContainer';

function App() {
  const authProviderCtx = useContext(AuthContext);
  const { openProfile, setOpenProfile } = authProviderCtx;

  useEffect(() => {
    const setUserInfo = async (googleId: string) => {
      getResponseFromServer(googleId).then((res) => {
        authProviderCtx.setAccessToken(res.accessToken);
        authProviderCtx.setProfileInfo({
          email: res.email,
          picture: res.picture,
          username: res.username,
          websites: res.websites,
        });
      });
    };
    if (getGoogleIdLocalStorage() === null) {
      handleGoogleIdFromQueryParams();
    }
    const googleId: any = getGoogleIdLocalStorage();
    if (googleId !== null) {
      setUserInfo(googleId);
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

  const getResponseFromServer = async (googleId: any) => {
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
      const response = await request.json();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  if (authProviderCtx.isLoggedIn) {
    return (
      <div className="App">
        <Profile />
        <WelcomePanel />
        <CalendarEvents />
        <WebsitesContainer />
        {openProfile && (
          <div
            className="background"
            onClick={() => setOpenProfile(!openProfile)}
          />
        )}
      </div>
    );
  } else {
    return <button onClick={signInHandler}>Log In</button>;
  }
}

export default App;
