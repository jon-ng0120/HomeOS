import { useRef } from 'react';
import classes from './GoogleSearch.module.scss';

const GoogleSearch = () => {
  const searchRef = useRef('');

  const handleClick = () => {
    searchRef.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(
      `https://google.com/search?q=${searchRef.current.value}`,
      '_blank'
    );
    searchRef.current.value = '';
  };
  return (
    <form
      onSubmit={handleSubmit}
      onClick={handleClick}
      className={classes.google_search_container}
    >
      <span class="material-icons">search</span>
      <input ref={searchRef} placeholder="Search on Google" />
    </form>
  );
};

export default GoogleSearch;
