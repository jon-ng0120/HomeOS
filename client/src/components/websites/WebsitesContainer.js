import { useState } from 'react';
import Website from './Website';
import AddWebsiteModal from './AddWebsiteModal';
import classes from './WebsiteContainer.module.scss';

const WebsitesContainer = () => {
  const websites = [
    {
      name: 'Google',
      url: 'https://www.google.com/',
      icon: 'https://api.faviconkit.com/google.com/144',
    },
    {
      name: 'Reddit',
      url: 'https://old.reddit.com/',
      icon: 'https://api.faviconkit.com/reddit.com/144',
    },
    {
      name: 'Google',
      url: 'https://www.google.com/',
      icon: 'https://api.faviconkit.com/google.com/144',
    },
    {
      name: 'Reddit',
      url: 'https://old.reddit.com/',
      icon: 'https://api.faviconkit.com/reddit.com/144',
    },
    {
      name: 'Google',
      url: 'https://www.google.com/',
      icon: 'https://api.faviconkit.com/google.com/144',
    },
    {
      name: 'Reddit',
      url: 'https://old.reddit.com/',
      icon: 'https://api.faviconkit.com/reddit.com/144',
    },
    {
      name: 'Google',
      url: 'https://www.google.com/',
      icon: 'https://api.faviconkit.com/google.com/144',
    },
    {
      name: 'Reddit',
      url: 'https://old.reddit.com/',
      icon: 'https://api.faviconkit.com/reddit.com/144',
    },
    {
      name: 'Google',
      url: 'https://www.google.com/',
      icon: 'https://api.faviconkit.com/google.com/144',
    },
    {
      name: 'Reddit',
      url: 'https://old.reddit.com/',
      icon: 'https://api.faviconkit.com/reddit.com/144',
    },
    {
      name: 'Google',
      url: 'https://www.google.com/',
      icon: 'https://api.faviconkit.com/google.com/144',
    },
    {
      name: 'Reddit',
      url: 'https://old.reddit.com/',
      icon: 'https://api.faviconkit.com/reddit.com/144',
    },
    {
      name: 'Google',
      url: 'https://www.google.com/',
      icon: 'https://api.faviconkit.com/google.com/144',
    },
    {
      name: 'Reddit',
      url: 'https://old.reddit.com/',
      icon: 'https://api.faviconkit.com/reddit.com/144',
    },
  ];

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={classes.website_container}>
      {websites.map((website) => {
        return <Website website={website} />;
      })}
      <div onClick={() => setOpenModal(true)}>
        <span className={`material-icons ${classes.modal}`}>add</span>
      </div>
      {openModal && <AddWebsiteModal closeModal={() => setOpenModal(false)} />}
    </div>
  );
};

export default WebsitesContainer;
