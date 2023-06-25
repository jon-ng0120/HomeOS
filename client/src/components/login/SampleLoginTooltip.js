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
        <p>john.smith01201996@gmail.com</p>
      </div>
      <div className={classes.password}>
        <p>Password:</p>
        <p>Test123567890!</p>
      </div>
    </div>
  );
};

export default SampleLoginTooltip;
