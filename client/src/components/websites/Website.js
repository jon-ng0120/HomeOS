import classes from './Website.module.scss';

const Website = ({ website }) => {
  return (
    <div className={classes.website}>
      <span className={`material-icons ${classes.more_options}`}>
        more_vert
      </span>
      <a href={website.url} target="_blank">
        <img src={website.icon} />
        <p>{website.name}</p>
      </a>
    </div>
  );
};

export default Website;
