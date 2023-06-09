import { useEffect, useContext } from 'react';
import icon from '../../assets/icon.png';
import googleIcon from '../../assets/google-icon.png';
import AuthContext from '../../store/auth-context';
import classes from './Login.module.scss';

const Login = () => {
  const authProviderCtx = useContext(AuthContext);
  const { openProfile, setOpenProfile, setWebsites } = authProviderCtx;

  useEffect(() => {
    const setUserInfo = async (googleId) => {
      getResponseFromServer(googleId).then((res) => {
        authProviderCtx.setAccessToken(res.accessToken);
        authProviderCtx.setProfileInfo({
          email: res.email,
          picture: res.picture,
          username: res.username,
        });
        setWebsites(res.websites);
      });
    };
    if (getGoogleIdLocalStorage() === null) {
      handleGoogleIdFromQueryParams();
    }
    const googleId = getGoogleIdLocalStorage();
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
    const googleId = query.get('id');
    if (googleId) {
      storeGoogleIdLocalStorage(googleId);
    }
  };

  const getGoogleIdLocalStorage = () => {
    return localStorage.getItem('googleId');
  };

  const storeGoogleIdLocalStorage = (googleId) => {
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
      const request = await fetch(
        'https://homeos.onrender.com/createAuthLink',
        {
          method: 'POST',
        }
      );
      const response = await request.json();
      console.log('Resposne', response);
      window.location.href = response.url;
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const getResponseFromServer = async (googleId) => {
    // get new token from server with refresh token
    try {
      const request = await fetch('https://homeos.onrender.com/getValidToken', {
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
  return (
    <div className={classes.login_container}>
      <div className={classes.icon_container}>
        <img src={icon} className={classes.icon} />
        <p className={classes.title}>HomeOS</p>
      </div>
      <div className={classes.login_info}>
        <p className={classes.welcome}>Welcome to HomeOS</p>
        <p className={classes.welcome_details}>
          Your new favorite simple and customizable homepage
        </p>
        <div className={classes.sign_in_btn} onClick={signInHandler}>
          <img className={classes.google_icon} src={googleIcon} />
          <p>Continue with Google</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
