import { useContext, useEffect } from 'react';
import './App.scss';
import CalendarEvents from './components/CalendarEvents';
import WelcomePanel from './components/WelcomePanel';
import FirebaseContext from './store/firebase-context';

function App() {
  const firebaseProviderCtx = useContext(FirebaseContext);

  useEffect(() => {
    const setAccessToken = async (googleId: string) => {
      getValidTokenFromServer(googleId).then(({ accessToken }) =>
        firebaseProviderCtx.setAccessToken(accessToken)
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
    if (firebaseProviderCtx.accessToken !== null) {
      firebaseProviderCtx.setIsLoggedIn(true);
    }
  }, [firebaseProviderCtx.accessToken]);

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

  const getToken = async () => {
    const token = await getValidTokenFromServer(
      firebaseProviderCtx.refreshToken
    );
    firebaseProviderCtx.setAccessToken(token.accessToken);
    console.log('Access', firebaseProviderCtx.accessToken);
  };

  if (firebaseProviderCtx.isLoggedIn) {
    return (
      <div className="App">
        <WelcomePanel />
        <CalendarEvents />
      </div>
    );
  } else {
    return <button onClick={signInHandler}>Log In</button>;
  }
}

export default App;
