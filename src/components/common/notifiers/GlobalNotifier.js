import React from 'react';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_NOTIFICATION } from 'actions/types';
import Modal from '../modal';

const getNotification = createSelector(
  (state) => state.notification,
  (notification) => notification,
);

const GlobalNotifier = () => {
  const notification = useSelector(getNotification);
  const { title, message } = notification;
  const dispatch = useDispatch();

  const _close = () => {
    dispatch({ type: CLEAR_NOTIFICATION });
  };

  return (
    <Modal
      open={!!(title && message)}
      title={title}
      description={message}
      closeModal={_close}
    />
  );
};

export default GlobalNotifier;
