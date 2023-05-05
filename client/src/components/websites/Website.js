import { useState } from 'react';
import classes from './Website.module.scss';
import WebsiteOptions from './WebsiteOptions';

const Website = ({ website }) => {
  const [optionsMenu, setOptionsMenu] = useState(false);

  const closeModalHandler = () => {
    setOptionsMenu(false);
  };

  return (
    <div className={classes.website}>
      <span
        className={`material-icons ${classes.more_options}`}
        onClick={() => setOptionsMenu(!optionsMenu)}
      >
        more_vert
      </span>
      {optionsMenu && <WebsiteOptions closeModalHandler={closeModalHandler} />}
      <a href={website.url} target="_blank">
        <img src={website.icon} />
        <p>{website.name}</p>
      </a>
    </div>
  );
};

export default Website;
