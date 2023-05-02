import { useState, useContext } from 'react';
import Website from './Website';
import AddWebsiteModal from './AddWebsiteModal';
import classes from './WebsiteContainer.module.scss';
import AuthContext from '../../store/auth-context';

const WebsitesContainer = () => {
  const [openModal, setOpenModal] = useState(false);
  const authProviderCtx = useContext(AuthContext);
  const { websites } = authProviderCtx;

  return (
    <>
      <div className={classes.website_container}>
        {websites.map((website) => {
          return (
            <Website
              key={website._id ? website._id : new Date().getTime()}
              website={website}
            />
          );
        })}
        {openModal && (
          <AddWebsiteModal closeModal={() => setOpenModal(false)} />
        )}
      </div>
      <div onClick={() => setOpenModal(true)}>
        <span className={`material-icons ${classes.modal}`}>add</span>
      </div>
    </>
  );
};

export default WebsitesContainer;
