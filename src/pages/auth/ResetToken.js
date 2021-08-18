import React, { useState } from 'react';
import Body from 'components/layouts/Body';
import TextField from 'components/common/input/TextField';
import API from 'utils/API';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';
import Loader from 'components/common/Loader';

import { Link, useHistory } from 'react-router-dom';

const ResetToken = () => {
  const history = useHistory();
  const dispatchNotification = useNotificationDispatcher();

  const [email, setEmail] = useState('');
  const [loading, setloading] = useState(false);

  const _onSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      if (!email) {
        dispatchNotification({
          title: 'Alert',
          message: 'fields are empty!',
        });
        setloading(false);
        return;
      }
      const data = { email };
      await API.post('/auth/reset-token', data);
      dispatchNotification({
        title: 'Alert',
        message: 'Password reset token sent to email',
      });
      setloading(false);
      history.push('/reset-password');
    } catch (err) {
      dispatchNotification({
        title: 'Alert',
        message: err?.response?.data?.message || 'Something went wrong',
      });
      setloading(false);
    }
  };

  return (
    <Body
      title="Get Reset Token"
    >
      <form onSubmit={_onSubmit}>
        <div className="row mb-2 mt-4">
          <TextField
            id="email"
            label="Email"
            colSize={6}
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className="mx-1">
          {
            loading
              ? (
                <Loader />
              )
              : (
                <button type="submit" className="btn btn-primary">Submit</button>
              )
          }
        </div>
      </form>
      <div className="row mt-2">
        <div className="col-12">
          <Link to="/register" className="link h5">
            Don&lsquo;t have an account? Register here.
          </Link>
        </div>
      </div>
    </Body>
  );
};

export default ResetToken;
