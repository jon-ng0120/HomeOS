import { useRef } from 'react';

const GoogleSearch = () => {
  const searchRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(
      `https://google.com/search?q=${searchRef.current.value}`,
      '_blank'
    );
    searchRef.current.value = '';
  };
  return (
    <form onSubmit={handleSubmit}>
      <input ref={searchRef} />
    </form>
  );
};

export default GoogleSearch;
