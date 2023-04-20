import classes from './AddWebsite.module.scss';

const AddWebsite = () => {
  return (
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
          <button type="button">Cancel</button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddWebsite;
