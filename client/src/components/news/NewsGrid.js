import { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import classes from './NewsGrid.module.scss';

const NewsGrid = () => {
  const [category, setCategory] = useState('general');
  const [newsItems, setNewsItems] = useState([]);
  useEffect(() => {
    const getNews = async () => {
      const newsResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=023293fc74884b89b7ef26247d57463a`
      );
      const data = await newsResponse.json();
      console.log(data);
      setNewsItems(data.articles);
    };
    getNews();
  }, [category]);
  return (
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
  );
};

export default NewsGrid;
