import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from 'actions/types';

const initialState = {
  title: null,
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION: {
      const { title, message } = action.payload;
      return {
        title,
        message,
      };
    }
    case CLEAR_NOTIFICATION: {
      return {
        title: null,
        message: null,
      };
    }
    default:
      return state;
  }
};
