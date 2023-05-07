import { useContext } from 'react';
import classes from './WebsiteOptions.module.scss';
import AuthContext from '../../store/auth-context';

const WebsiteOptions = ({ website, closeModalHandler }) => {
  const authProviderCtx = useContext(AuthContext);
  const { setWebsites, websites } = authProviderCtx;

  const deleteWebsite = () => {
    setWebsites((currentSites) =>
      currentSites.filter((data) => data.name != website.name)
    );
    console.log(websites);
  };

  return (
    <>
      <div className={classes.overlay} onClick={closeModalHandler} />
      <div className={classes.more_options}>
        <p>
          <span className="material-icons">edit</span>Edit
        </p>
        <p onClick={deleteWebsite}>
          <span className="material-icons">clear</span>Delete
        </p>
      </div>
    </>
  );
};

export default WebsiteOptions;
