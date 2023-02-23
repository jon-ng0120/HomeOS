import { useContext, useEffect } from 'react';
import './App.scss';
import CalendarEvents from './components/CalendarEvents';
import WelcomePanel from './components/WelcomePanel';
import FirebaseContext from './store/firebase-context';
import {
  signOut,
  setPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

function App() {
  const firebaseProviderCtx = useContext(FirebaseContext);
  const auth = getAuth();
  const googleSignIn = async () => {
    await setPersistence(auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar.readonly');

    const result = await signInWithPopup(auth, provider);
    firebaseProviderCtx.setIsLoggedIn(true);
    const credential = await GoogleAuthProvider.credentialFromResult(result);
    firebaseProviderCtx.setAccessToken(credential?.accessToken);
  };

  const signOutHandler = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user
        ? firebaseProviderCtx.setIsLoggedIn(true)
        : firebaseProviderCtx.setIsLoggedIn(false);
    });
  }, []);

  if (firebaseProviderCtx.isLoggedIn) {
    return (
      <div className="App">
        <WelcomePanel />
        <CalendarEvents />
        <button onClick={signOutHandler}>Sign out</button>
      </div>
    );
  } else {
    return <button onClick={googleSignIn}>Log In</button>;
  }
}

export default App;
