import { useState } from 'react';
import FirebaseContext from './firebase-context';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBwQEf82nqwNTw8PchPS3Qu9u-CmiaR-s8',
  authDomain: 'startpage-a74ae.firebaseapp.com',
  databaseURL: 'https://startpage-a74ae-default-rtdb.firebaseio.com',
  projectId: 'startpage-a74ae',
  storageBucket: 'startpage-a74ae.appspot.com',
  messagingSenderId: '432842189233',
  appId: '1:432842189233:web:5878b6191e4f74b3e0b590',
};

const FirebaseProvider = (props) => {
  initializeApp(firebaseConfig);

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState();

  const firebaseContext = {
    isLoggedIn,
    setIsLoggedIn,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
  };

  return (
    <FirebaseContext.Provider value={firebaseContext}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
