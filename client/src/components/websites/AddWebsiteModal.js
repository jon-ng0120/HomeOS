import { useState } from 'react';
import classes from './AddWebsiteModal.module.scss';

const AddWebsite = ({ closeModal }) => {
  const [website, setWebsite] = useState('');
  const [url, setUrl] = useState('');

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const googleId = localStorage.getItem('googleId');
      const res = await fetch('http://localhost:8080/website/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleId,
          website,
          url,
        }),
      });
      if (res.status === 204) {
        setWebsite('');
        setUrl('');
      } else {
        console.log('not 204');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={classes.overlay} onClick={closeModal} />
      <div className={classes.add_website_container}>
        <h2>Add Website</h2>
        <form onSubmit={formHandler}>
          <div>
            <label>Website Name</label>
            <input
              type="text"
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
            />
          </div>
          <div>
            <label>Website URL</label>
            <input
              type="text"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
          </div>
          <div className={classes.form_actions}>
            <button
              type="button"
              className={classes.cancel}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button type="submit" className={classes.submit}>
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddWebsite;
