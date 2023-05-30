import notFoundImage from '../../assets/image-not-found.png';
import classes from './NewsItem.module.scss';
import { extractWebsiteDomain, formatDate } from '../../utilities/utilities';

const NewsItem = ({ image, url, source, title, description, publishedAt }) => {
  console.log(description);
  const websiteDomain = extractWebsiteDomain(url);
  const websiteIcon = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${websiteDomain}&size=16`;
  const formattedDate = formatDate(publishedAt).split(' ').splice(1).join(' ');

  return (
    <a href={url} target="_blank" className={classes.newsItem}>
      <div className={classes.image_container}>
        <img src={image ? image : notFoundImage} />
      </div>
      <div className={classes.newsItem_content}>
        <div className={classes.source}>
          <img src={websiteIcon} />
          <span>{source}</span>
        </div>

        <h1 className={classes.title}>{title}</h1>
        <p className={classes.description}>{description}</p>
        <p className={classes.publishedDate}>
          Published On: <span>{formattedDate}</span>
        </p>
      </div>
    </a>
  );
};

export default NewsItem;
