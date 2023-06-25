import { useState } from 'react';
import AuthContext from './auth-context';

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState();
  const [profileInfo, setProfileInfo] = useState();
  const [openProfile, setOpenProfile] = useState(false);
  const [websites, setWebsites] = useState([]);

  const authContext = {
    isLoggedIn,
    setIsLoggedIn,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    profileInfo,
    setProfileInfo,
    openProfile,
    setOpenProfile,
    websites,
    setWebsites,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
