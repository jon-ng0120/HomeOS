import { useState, useContext, useEffect, useRef } from 'react';
import classes from './WebsiteModal.module.scss';
import AuthContext from '../../store/auth-context';
import { validation, extractWebsiteDomain } from '../../utilities/utilities';

const WebsiteModal = ({ websiteObj, closeModal, type }) => {
  const authProviderCtx = useContext(AuthContext);
  const { websites, setWebsites } = authProviderCtx;
  const initialRender = useRef(true);

  const googleId = localStorage.getItem('googleId');

  const [values, setValues] = useState({
    website: websiteObj.website,
    url: websiteObj.url,
    uuid: websiteObj.uuid,
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value };
    setValues(newObj);
  };

  const handleValidation = (e) => {
    e.preventDefault();
    setErrors(modifyErrorOnModalType());
  };

  const addWebsite = async () => {
    const websiteDomain = extractWebsiteDomain(values.url);

    const websiteObj = {
      googleId,
      uuid: crypto.randomUUID(),
      name: values.website,
      url: values.url,
      icon: `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${websiteDomain}&size=64`,
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
  };

  const editWebsite = async () => {
    const websiteObject = values;
    const websiteDomain = extractWebsiteDomain(websiteObject.url);
    const websiteIcon = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${websiteDomain}&size=64`;
    const newState = await websites.map((website) => {
      if (website.uuid === websiteObject.uuid) {
        let newObj = { ...website };
        newObj.name = values.website;
        newObj.url = values.url;
        newObj.icon = websiteIcon;
        return newObj;
      }
      return website;
    });

    const res = await fetch('http://localhost:8080/website/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleId, websiteIcon, ...websiteObject }),
    });
    if (res.status === 204) {
      setWebsites(newState);
      closeModal();
    } else {
      console.log('not 204');
    }
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

  const modifyErrorOnModalType = () => {
    let errors = validation(websites, values);
    if (type !== 'ADD') {
      if (errors.website === 'This website has already been added') {
        delete errors.website;
      }
    }
    return errors;
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
        <h2>Add website</h2>
        <span className={classes.description}> Add website details</span>
        <form onSubmit={handleValidation}>
          <div>
            <label>Website*</label>
            <input
              className={errors.website ? classes.error : classes.valid}
              name="website"
              type="text"
              value={values.website}
              onChange={handleInput}
              placeholder="Website Name"
            />
            {errors.website && (
              <div className={classes.error_message}>
                <span className="material-icons">error_outline</span>
                <p>{errors.website}</p>
              </div>
            )}
          </div>
          <div>
            <label>URL*</label>
            <input
              className={errors.url ? classes.error : classes.valid}
              name="url"
              value={values.url}
              type="text"
              onChange={handleInput}
              placeholder="https://www.example.ca/"
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
              {type === 'ADD' ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WebsiteModal;
