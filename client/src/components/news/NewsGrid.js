import { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import classes from './NewsGrid.module.scss';

const NewsGrid = () => {
  const [category, setCategory] = useState('general');
  const [newsItems, setNewsItems] = useState([]);
  const categories = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];

  useEffect(() => {
    const getNews = async () => {
      const newsResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=023293fc74884b89b7ef26247d57463a`
      );
      const data = await newsResponse.json();
      setNewsItems(data.articles);
    };
    getNews();
  }, [category]);
  return (
    <div className={classes.news_grid_container}>
      <ul className={classes.categories}>
        {categories.map((item) => {
          return (
            <li
              onClick={() => setCategory(item)}
              key={item}
              className={item === category && classes.active}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          );
        })}
      </ul>
      <div className={classes.news_grid}>
        {newsItems &&
          newsItems.map((item) => {
            return (
              <NewsItem
                key={item.id}
                url={item.url}
                image={item.urlToImage}
                source={item.source.name}
                title={item.title}
                description={item.description}
                publishedAt={item.publishedAt}
              />
            );
          })}
      </div>
    </div>
  );
};

export default NewsGrid;
