import Website from './Website';
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
  return (
    <div className={classes.website_container}>
      {websites.map((website) => {
        return <Website website={website} />;
      })}
    </div>
  );
};

export default WebsitesContainer;
