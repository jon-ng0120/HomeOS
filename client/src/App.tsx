import { useContext, useEffect } from 'react';
import './App.scss';
import CalendarEvents from './components/CalendarEvents';
import WelcomePanel from './components/WelcomePanel';
import FirebaseContext from './store/firebase-context';
import {
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { log } from 'console';

function App() {
  const firebaseProviderCtx = useContext(FirebaseContext);
  const auth = getAuth();
  const googleSignIn = async () => {
    // await setPersistence(auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar.readonly');

    const result = await signInWithPopup(auth, provider);

    firebaseProviderCtx.setIsLoggedIn(true);
    // const credential = await GoogleAuthProvider.credentialFromResult(result);
    // console.log(result);

    // firebaseProviderCtx.setAccessToken(credential?.accessToken);
  };

  const signOutHandler = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // onAuthStateChanged(auth, async (user) => {
    //   const idToken = await user?.getIdToken();
    //   firebaseProviderCtx.setAccessToken(idToken);
    //   user
    //     ? firebaseProviderCtx.setIsLoggedIn(true)
    //     : firebaseProviderCtx.setIsLoggedIn(false);
    // });
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get('accessToken');
    const refreshToken = query.get('refreshToken');
    console.log('Access', accessToken);
    console.log('Refresh', refreshToken);
    if (accessToken !== null) {
      firebaseProviderCtx.setIsLoggedIn(true);
      firebaseProviderCtx.setAccessToken(accessToken);
    }
    firebaseProviderCtx.setRefreshToken(refreshToken);
  }, []);

  const createGoogleAuthLink = async () => {
    // try {
    const request = await fetch('http://localhost:8080/createAuthLink', {
      method: 'POST',
    });
    const response = await request.json();
    console.log(response);
    window.location.href = response.url;

    // } catch (error) {
    //   console.log("App.js 12 | error", error);
    //   throw new Error("Issue with Login", error.message);
    // }
    // firebaseProviderCtx.setIsLoggedIn(true);
    // firebaseProviderCtx.setAccessToken(credential?.accessToken);
  };

  const getValidTokenFromServer = async (refreshToken: any) => {
    // get new token from server with refresh token
    console.log(refreshToken);
    try {
      const request = await fetch('http://localhost:8080/getValidToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      });
      const token = await request.json();
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
        <button onClick={signOutHandler}>Sign out</button>
        <button onClick={getToken}>Click</button>
      </div>
    );
  } else {
    return <button onClick={createGoogleAuthLink}>Log In</button>;
  }
}

export default App;
