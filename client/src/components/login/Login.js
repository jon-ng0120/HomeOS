import { useEffect, useContext, useState } from 'react';
import icon from '../../assets/icon.png';
import googleIcon from '../../assets/google-icon.png';
import AuthContext from '../../store/auth-context';
import classes from './Login.module.scss';
import PulseLoader from 'react-spinners/PulseLoader';
import SampleLoginTooltip from './SampleLoginTooltip';
import overview from '../../assets/overview.png';
import calendar from '../../assets/calendar.png';
import news from '../../assets/news.png';

const Login = () => {
  const authProviderCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { setWebsites } = authProviderCtx;

  useEffect(() => {
    const googleId = handleGoogleIdFromQueryParams();

    const setUserInfo = async (googleId) => {
      getResponseFromServer(googleId).then((res) => {
        authProviderCtx.setAccessToken(res.accessToken);
        authProviderCtx.setProfileInfo({
          email: res.email,
          picture: res.picture,
          username: res.username,
          googleId: googleId,
        });
        setWebsites(res.websites);
      });
    };
    setUserInfo(googleId);
  }, []);

  useEffect(() => {
    if (authProviderCtx.accessToken !== null) {
      authProviderCtx.setIsLoggedIn(true);
    }
  }, [authProviderCtx.accessToken]);

  const handleGoogleIdFromQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    const googleId = query.get('id');
    return googleId;
  };

  const signInHandler = async () => {
    try {
      setLoading(true);
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
      {loading ? (
        <div className={classes.loading_container}>
          <PulseLoader color="#f36d14" />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className={classes.details}>
            <div>
              <div className={classes.login_info}>
                <h1 className={classes.welcome}>Welcome to HomeOS</h1>
                <p className={classes.welcome_details}>
                  Your new favorite simple and customizable homepage
                </p>
                <div className={classes.sign_in_btn} onClick={signInHandler}>
                  <img className={classes.google_icon} src={googleIcon} />
                  <p>Continue with Google</p>
                </div>
                <SampleLoginTooltip />
              </div>
              <div className={classes.imageContainer}>
                <img src={overview} />
              </div>
            </div>
            <div>
              <div>
                <h2>Google Calendar Integration</h2>
                <p>
                  Never forget any appointment. Connect your Google calendar to
                  see your upcoming events and tasks for the month
                </p>
              </div>
              <div className={classes.imageContainer}>
                <img src={calendar} />
              </div>
            </div>
            <div>
              <div>
                <h2>Global News Highlights</h2>
                <p>
                  Stay up to date with the latest news from around the world
                  with the ability to filter news through 7 categories, and from
                  over 50 countries
                </p>
              </div>
              <div className={classes.imageContainer}>
                <img src={news} />
              </div>
            </div>
            <div>
              <div>
                <h2>Customizable Bookmarks</h2>
                <p>
                  Create a list of your favorite websites and save them in your
                  bookmarked section.
                </p>
              </div>
              <div className={classes.imageContainer}>
                <img src={news} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
