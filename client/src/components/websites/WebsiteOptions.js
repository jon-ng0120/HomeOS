import { useContext } from 'react';
import classes from './WebsiteOptions.module.scss';
import AuthContext from '../../store/auth-context';

const WebsiteOptions = ({ website, closeModalHandler }) => {
  const authProviderCtx = useContext(AuthContext);
  const { setWebsites, websites } = authProviderCtx;

  const deleteWebsite = async () => {
    setWebsites((currentSites) =>
      currentSites.filter((data) => data.name != website.name)
    );
    const googleId = localStorage.getItem('googleId');

    const websiteName = {
      googleId,
      name: website.name,
    };
    await fetch('http://localhost:8080/website/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(websiteName),
    });
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
