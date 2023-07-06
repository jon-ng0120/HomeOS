import { useState, useContext } from 'react';
import Website from './Website';
import WebsiteModal from './WebsiteModal';
import GoogleSearch from '../googleSearch/GoogleSearch';
import classes from './WebsiteContainer.module.scss';
import AuthContext from '../../store/auth-context';

const WebsitesContainer = () => {
  const [openModal, setOpenModal] = useState(false);
  const authProviderCtx = useContext(AuthContext);
  const { websites } = authProviderCtx;

  return (
    <div className={classes.flex}>
      <GoogleSearch />
      <div className={classes.modal_container}>
        <p>Saved Bookmarks</p>
        <div className={classes.open_modal} onClick={() => setOpenModal(true)}>
          <span className="material-icons">add</span>
          <span>Add Website</span>
        </div>
      </div>
      <div className={classes.website_container}>
        {websites.map((website) => {
          return <Website key={website.name} website={website} />;
        })}
        {openModal && (
          <WebsiteModal
            websiteObj={{ website: '', url: '' }}
            closeModal={() => setOpenModal(false)}
            type="ADD"
          />
        )}
      </div>
    </div>
  );
};

export default WebsitesContainer;
