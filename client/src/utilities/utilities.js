export const roundTemperatures = (num) => {
  return Math.round(num);
};

export const formatDate = (dateStr) => {
  const date = new Date(Date.parse(dateStr));
  return date.toDateString();
};

export const formatTime = (dateStr) => {
  const date = new Date(Date.parse(dateStr));
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const validation = (websiteArr, { website, url }) => {
  const errors = {};

  if (website.trim().length === 0) {
    errors.website = 'Please enter a website name';
  }

  if (checkIfWebsiteExists(websiteArr, website)) {
    errors.website = 'This website has already been added';
  }

  if (!checkUrl(url)) {
    errors.url = 'Please enter a valid URL';
  }

  return errors;
};

const checkUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

const checkIfWebsiteExists = (websites, websiteName) => {
  const websiteExists = websites.some(
    (website) => website.name === websiteName
  );
  return websiteExists;
};
