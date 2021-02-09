import API from './API';

const setAuthToken = (token) => {
  if (token) {
    // Apply auth token to every request
    API.defaults.headers.common['x-auth-token'] = token;
  } else {
    // Delete auth header if token not found
    delete API.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
