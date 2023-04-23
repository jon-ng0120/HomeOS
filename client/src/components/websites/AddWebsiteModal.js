import classes from './AddWebsiteModal.module.scss';

const AddWebsite = ({ closeModal }) => {
  return (
    <>
      <div className={classes.overlay} onClick={closeModal} />
      <div className={classes.add_website_container}>
        <h2>Add Website</h2>
        <form>
          <div>
            <label>Website Name</label>
            <input type="text" />
          </div>
          <div>
            <label>Website URL</label>
            <input type="text" />
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
