import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const LogOut = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const logOutHandler = () => {
    const url = window.location.href;
    setIsLoggedIn(false);
    window.location.href = removeGoogleIdParams(url);
  };

  const removeGoogleIdParams = (url) => {
    return url.split('?')[0];
  };

  return <p onClick={logOutHandler}>Sign Out</p>;
};

export default LogOut;
