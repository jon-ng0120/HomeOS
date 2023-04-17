import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const LogOut = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const logOutHandler = () => {
    const url: any = window.location.href;
    const googleId = localStorage.getItem('googleId');
    setIsLoggedIn(!isLoggedIn);
    if (googleId !== null) {
      localStorage.removeItem('googleId');
      window.location.href = removeGoogleIdParams(url);
    }
  };

  const removeGoogleIdParams = (url: String) => {
    return url.split('?')[0];
  };

  return <p onClick={logOutHandler}>Sign Out</p>;
};

export default LogOut;
