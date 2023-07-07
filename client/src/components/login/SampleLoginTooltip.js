import React from 'react';
import classes from './SampleLoginTooltip.module.scss';

const SampleLoginTooltip = () => {
  return (
    <div className={classes.tool_tip}>
      <div className={classes.description}>
        <p>Login using this sample account</p>
      </div>

      <div className={classes.email}>
        <p>Email:</p>
        <p>homeostester@gmail.com</p>
      </div>
      <div className={classes.password}>
        <p>Password:</p>
        <p>Admin123!</p>
      </div>
    </div>
  );
};

export default SampleLoginTooltip;
