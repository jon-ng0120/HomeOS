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

export const validation = ({ website, url }) => {
  const errors = {};

  if (website.trim().length === 0) {
    errors.website = true;
  }

  if (!checkUrl(url)) {
    errors.url = true;
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
