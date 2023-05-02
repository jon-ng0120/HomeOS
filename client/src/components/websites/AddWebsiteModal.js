import { useState, useContext, useEffect } from 'react';
import classes from './AddWebsiteModal.module.scss';
import AuthContext from '../../store/auth-context';
import { validation } from '../../utilities/utilities';

const AddWebsite = ({ closeModal }) => {
  const authProviderCtx = useContext(AuthContext);
  const { setWebsites } = authProviderCtx;

  const [values, setValues] = useState({
    website: '',
    url: '',
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value };
    setValues(newObj);
  };

  const handleValidation = (e) => {
    e.preventDefault();
    setErrors(validation(values));
  };

  useEffect(() => {
    const isEmptyError = Object.keys(errors).length;
    if (isEmptyError === 0) {
      submitForm();
    }
  }, [errors]);

  const submitForm = async (e) => {
    try {
      const googleId = localStorage.getItem('googleId');
      const websiteDomain = values.url.match(
        /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i
      )[1];

      const websiteObj = {
        googleId,
        name: values.website,
        url: values.url,
        icon: `https://api.faviconkit.com/${websiteDomain}/144`,
      };
      const res = await fetch('http://localhost:8080/website/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(websiteObj),
      });
      if (res.status === 204) {
        setWebsites((currentSites) => [...currentSites, websiteObj]);
        closeModal();
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
        <form onSubmit={handleValidation}>
          <div>
            <label>Website Name</label>
            <input
              className={errors.website ? classes.error : classes.valid}
              name="website"
              type="text"
              onChange={handleInput}
            />
            {errors.website && (
              <div className={classes.error_message}>
                <span className="material-icons">error_outline</span>Please
                <p>enter a website name</p>
              </div>
            )}
          </div>
          <div>
            <label>Website URL</label>
            <input
              className={errors.url ? classes.error : classes.valid}
              name="url"
              type="text"
              onChange={handleInput}
            />
            {errors.url && (
              <div className={classes.error_message}>
                <span className="material-icons">error_outline</span>Please
                enter a valid URL
              </div>
            )}
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
