import jwt from 'jsonwebtoken';

import isEmpty from 'validations/isEmpty';

import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from 'actions/types';
import setAuthToken from 'utils/setAuthToken';

const initialState = {
  isAuthenticated: false,
  user: null,
  organization: null,
  categoriesFollowed: [],
  isSuperAdmin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      setAuthToken(action.payload);
      const {
        user, organization, categoriesFollowed, isSuperAdmin,
      } = jwt.decode(action.payload);
      return {
        isAuthenticated: !isEmpty(user),
        user,
        organization,
        categoriesFollowed,
        isSuperAdmin,
      };
    }
    case CLEAR_CURRENT_USER: {
      localStorage.removeItem('jwtToken');
      setAuthToken(null);
      return {
        isAuthenticated: false,
        user: null,
        organization: null,
        categoriesFollowed: [],
        isSuperAdmin: false,
      };
    }
    default:
      return state;
  }
};
