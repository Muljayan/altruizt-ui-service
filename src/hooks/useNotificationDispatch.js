import { useDispatch } from 'react-redux';
import {
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from 'actions/types';

const useNotificationDispatcher = () => {
  const dispatch = useDispatch();

  return (payload) => {
    console.log('fired');
    dispatch({
      type: SET_NOTIFICATION,
      payload,
    });

    setTimeout(() => {
      dispatch({
        type: CLEAR_NOTIFICATION,
      });
    }, 3500);
  };
};

export default useNotificationDispatcher;
