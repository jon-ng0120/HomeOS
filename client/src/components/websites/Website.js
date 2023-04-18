import classes from './Website.module.scss';

const Website = ({ website }) => {
  return (
    <a href={website.url} target="_blank">
      <div className={classes.website}>
        <img src={website.icon} />

        <p>{website.name}</p>
      </div>
    </a>
  );
};

export default Website;
