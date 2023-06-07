import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Profile.module.scss';
import LogOut from '../logout/LogOut';

const Profile = () => {
  const authProviderCtx = useContext(AuthContext);
  const { username, email, picture } = authProviderCtx.profileInfo;
  const { openProfile, setOpenProfile } = authProviderCtx;

  return (
    <div className={classes.profile}>
      <img
        className={classes.profile_picture}
        src={picture}
        referrerPolicy="no-referrer"
        onClick={() => setOpenProfile(!openProfile)}
      />
      <div
        className={`${classes.profile_menu} ${
          openProfile ? classes.active : classes.inactive
        }`}
      >
        <div className={classes.user_info}>
          <p className={classes.username}>{username}</p>
          <p className={classes.email}>{email}</p>
        </div>
        <div className={classes.profile_menu_actions}>
          <div>
            <span className="material-icons">logout</span>
            <LogOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
