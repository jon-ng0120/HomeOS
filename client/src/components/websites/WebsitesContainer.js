import { useState, useContext } from 'react';
import Website from './Website';
import WebsiteModal from './WebsiteModal';
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
          console.log(website);
          return <Website key={website.uuid} website={website} />;
        })}
        {openModal && (
          <WebsiteModal
            websiteObj={{ website: '', url: '' }}
            closeModal={() => setOpenModal(false)}
            type="ADD"
          />
        )}
      </div>
      <div onClick={() => setOpenModal(true)}>
        <span className={`material-icons ${classes.modal}`}>add</span>
      </div>
    </>
  );
};

export default WebsitesContainer;
