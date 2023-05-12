import { useState, useContext, useEffect, useRef } from 'react';
import classes from './WebsiteModal.module.scss';
import AuthContext from '../../store/auth-context';
import { validation, extractWebsiteDomain } from '../../utilities/utilities';

const WebsiteModal = ({ websiteObj, closeModal, type }) => {
  const authProviderCtx = useContext(AuthContext);
  const { websites, setWebsites } = authProviderCtx;
  const initialRender = useRef(true);

  const [values, setValues] = useState({
    website: websiteObj.website,
    url: websiteObj.url,
  });

  const originalValues = values;

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value };
    setValues(newObj);
  };

  const handleValidation = (e) => {
    e.preventDefault();
    setErrors(validation(websites, values));
  };

  const addWebsite = async () => {
    const googleId = localStorage.getItem('googleId');
    const websiteDomain = extractWebsiteDomain(values.url);

    const websiteObj = {
      googleId,
      uuid: crypto.randomUUID(),
      name: values.website,
      url: values.url,
      icon: `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${websiteDomain}&size=64`,
    };
    console.log(websiteObj);
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
  };

  const editWebsite = async () => {
    console.log(originalValues);
    // const newState = await websites.map((website) => {
    //   console.log(website);
    //   if (website.name === values.website) {
    //     let newObj = { ...website };
    //     console.log(newObj);
    //     newWebsiteObj = values.website
    //     url: values.url
    //     return newObj;
    //   }
    // });
    // console.log(newState);
    // setWebsites(newState);
  };

  const submitForm = async (e) => {
    try {
      if (type === 'ADD') {
        addWebsite();
      } else {
        editWebsite();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const isEmptyError = Object.keys(errors).length;
      if (isEmptyError === 0) {
        submitForm();
      }
    }
  }, [errors]);

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
              value={values.website}
              onChange={handleInput}
            />
            {errors.website && (
              <div className={classes.error_message}>
                <span className="material-icons">error_outline</span>
                <p>{errors.website}</p>
              </div>
            )}
          </div>
          <div>
            <label>Website URL</label>
            <input
              className={errors.url ? classes.error : classes.valid}
              name="url"
              value={values.url}
              type="text"
              onChange={handleInput}
            />
            {errors.url && (
              <div className={classes.error_message}>
                <span className="material-icons">error_outline</span>
                <p>{errors.url}</p>
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

export default WebsiteModal;
