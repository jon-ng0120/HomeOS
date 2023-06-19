import { useState, useEffect, useRef } from 'react';
import NewsItem from './NewsItem';
import classes from './NewsGrid.module.scss';

const NewsGrid = () => {
  const dropdownRef = useRef();
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [category, setCategory] = useState('general');
  const [newsItems, setNewsItems] = useState([]);
  const [country, setCountry] = useState({ name: 'United States', code: 'us' });
  const categories = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];
  const countries = [
    { name: 'United States', code: 'us' },
    { name: 'Canada', code: 'ca' },
    { name: 'Argentina', code: 'ar' },
    { name: 'Australia', code: 'au' },
    { name: 'Austria', code: 'at' },
    { name: 'Belgium', code: 'be' },
    { name: 'Brazil', code: 'br' },
    { name: 'Bulgaria', code: 'bg' },
    { name: 'China', code: 'cn' },
    { name: 'Colombia', code: 'co' },
    { name: 'Cuba', code: 'cu' },
    { name: 'Czech Republic', code: 'cz' },
    { name: 'Egypt', code: 'eg' },
    { name: 'France', code: 'fr' },
    { name: 'Germany', code: 'de' },
    { name: 'Greece', code: 'gr' },
    { name: 'Hong Kong', code: 'hk' },
    { name: 'Hungary', code: 'hu' },
    { name: 'India', code: 'in' },
    { name: 'Indonesia', code: 'id' },
    { name: 'Ireland', code: 'ie' },
    { name: 'Israel', code: 'il' },
    { name: 'Italy', code: 'it' },
    { name: 'Japan', code: 'jp' },
    { name: 'Latvia', code: 'lv' },
    { name: 'Lithuania', code: 'lt' },
    { name: 'Malaysia', code: 'my' },
    { name: 'Mexico', code: 'mx' },
    { name: 'Morocco', code: 'ma' },
    { name: 'Netherlands', code: 'nl' },
    { name: 'New Zealand', code: 'nz' },
    { name: 'Nigeria', code: 'ng' },
    { name: 'Norway', code: 'no' },
    { name: 'Philippines', code: 'ph' },
    { name: 'Poland', code: 'pl' },
    { name: 'Portugal', code: 'pt' },
    { name: 'Romania', code: 'ro' },
    { name: 'Russia', code: 'ru' },
    { name: 'Saudi Arabia', code: 'sa' },
    { name: 'Serbia', code: 'rs' },
    { name: 'Singapore', code: 'sg' },
    { name: 'Slovakia', code: 'sk' },
    { name: 'Slovenia', code: 'si' },
    { name: 'South Africa', code: 'za' },
    { name: 'South Korea', code: 'kr' },
    { name: 'Sweden', code: 'se' },
    { name: 'Switzerland', code: 'ch' },
    { name: 'Taiwan', code: 'tw' },
    { name: 'Thailand', code: 'th' },
    { name: 'Turkey', code: 'tr' },
    { name: 'UAE', code: 'ae' },
    { name: 'Ukraine', code: 'ua' },
    { name: 'United Kingdom', code: 'gb' },
    { name: 'Venuzuela', code: 've' },
  ];

  const countryChangeHandler = (e) => {
    setCountry({
      name: e.target.innerText,
      code: e.target.getAttribute('data-country-code'),
    });
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  useEffect(() => {
    const getNews = async () => {
      // const newsResponse = await fetch(
      //   `https://newsapi.org/v2/top-headlines?country=${country.code}&category=${category}&apiKey=023293fc74884b89b7ef26247d57463a`
      // );
      const newsResponse = await fetch(`http://localhost:8080/news`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: country.code,
          category: category,
        }),
      });
      const data = await newsResponse.json();
      setNewsItems(data.articles);
    };
    getNews();
  }, [category, country]);

  useEffect(() => {
    const clickHandler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setActiveDropdown(false);
      }
    };
    document.addEventListener('mousedown', clickHandler);

    return () => {
      document.removeEventListener('mousedown', clickHandler);
    };
  });

  return (
    <div className={classes.news_grid_container}>
      <div className={classes.categories_container}>
        <ul className={classes.categories}>
          {categories.map((item) => {
            return (
              <li
                onClick={() => setCategory(item)}
                key={item}
                className={item === category ? classes.active : ''}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            );
          })}
        </ul>
        <div className={classes.select_menu}>
          <p>Select Country</p>
          <div ref={dropdownRef}>
            <div className={classes.select_btn} onClick={toggleDropdown}>
              <span>{country.name}</span>
              <span
                className={`material-icons ${classes.caret} ${
                  activeDropdown && classes.caret_rotate
                }`}
              >
                expand_more
              </span>
            </div>
            <ul
              className={`${classes.options} ${
                activeDropdown
                  ? classes.activeDropdown
                  : classes.hidden_dropdown
              }`}
            >
              {countries.map((country) => {
                return (
                  <li
                    key={country.code}
                    onClick={countryChangeHandler}
                    className={classes.option}
                    data-country-code={country.code}
                  >
                    {country.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className={classes.news_grid} key={category}>
        {newsItems &&
          newsItems.map((item) => {
            return (
              <NewsItem
                key={item.title}
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
