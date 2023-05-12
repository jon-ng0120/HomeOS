import { useState, useContext } from 'react';
import classes from './WebsiteOptions.module.scss';
import AuthContext from '../../store/auth-context';
import AddWebsiteModal from './WebsiteModal';

const WebsiteOptions = ({ website, closeModalHandler }) => {
  const [openModal, setOpenModal] = useState(false);
  const authProviderCtx = useContext(AuthContext);
  const { setWebsites, websites } = authProviderCtx;

  const editModalHandler = () => {
    setOpenModal(true);
  };

  const deleteWebsite = async () => {
    setWebsites((currentSites) =>
      currentSites.filter((data) => data.name != website.name)
    );
    const googleId = localStorage.getItem('googleId');

    const websiteObj = {
      googleId,
      uuid: website.uuid,
    };
    await fetch('http://localhost:8080/website/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(websiteObj),
    });
  };

  return (
    <>
      {openModal && (
        <AddWebsiteModal
          websiteObj={{ website: website.name, url: website.url }}
          closeModal={closeModalHandler}
        />
      )}
      <div className={classes.overlay} onClick={closeModalHandler} />
      <div className={classes.more_options} onClick={editModalHandler}>
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
