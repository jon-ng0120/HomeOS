import classes from './WebsiteOptions.module.scss';

const WebsiteOptions = ({ closeModalHandler }) => {
  return (
    <>
      <div className={classes.overlay} onClick={closeModalHandler} />
      <div className={classes.more_options}>
        <p>
          <span className="material-icons">edit</span>Edit
        </p>
        <p>
          <span className="material-icons">clear</span>Delete
        </p>
      </div>
    </>
  );
};

export default WebsiteOptions;
