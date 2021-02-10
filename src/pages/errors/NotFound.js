import InPageNotifier from 'components/common/notifiers/InPageNotifier';
import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  const _goBack = () => {
    history.goBack();
  };
  const _goHome = () => {
    history.push('/');
  };

  return (
    <InPageNotifier
      icon="error-404"
      header="Page Not Found!"
      title1="The page you're looking for is not found"
      buttonLabel1="Go Back"
      buttonFunction1={_goBack}
      buttonLabel2="Go Home"
      buttonFunction2={_goHome}
    />
  );
};

export default NotFound;
