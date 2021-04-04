const { REACT_APP_BASE_URL } = process.env;

export const userImage = (name) => {
  if (name) {
    return `${REACT_APP_BASE_URL}/images/users/${name}`;
  }
  return '';
};

export const eventImage = (name) => {
  if (name) {
    return `${REACT_APP_BASE_URL}/images/events/${name}`;
  }
  return '';
};
