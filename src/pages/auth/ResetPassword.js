import React, { useState } from 'react';
import Body from 'components/layouts/Body';
import TextField from 'components/common/input/TextField';
import API from 'utils/API';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';
import Loader from 'components/common/Loader';

import { Link, useHistory } from 'react-router-dom';

const ResetPassword = () => {
  const history = useHistory();
  const dispatchNotification = useNotificationDispatcher();

  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setloading] = useState(false);

  const _onSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      if (!email || !password || !resetToken) {
        dispatchNotification({
          title: 'Alert',
          message: 'fields are empty!',
        });
        setloading(false);
        return;
      }
      if (password && password.length < 8) {
        dispatchNotification({
          title: 'Alert',
          message: 'Password should be greater than 8 characters!',
        });
        setloading(false);
        return;
      }

      if (password !== password2) {
        dispatchNotification({
          title: 'Alert',
          message: 'Passwords do not match!',
        });
        setloading(false);
        return;
      }
      const data = { email, password, resetToken };
      await API.post('/auth/reset-password', data);
      dispatchNotification({
        title: 'Alert',
        message: 'Password reset successful',
      });
      setloading(false);
      history.push('/login');
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
      title="Reset Password"
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
          <TextField
            id="Email"
            label="Reset Token"
            colSize={6}
            value={resetToken}
            onChange={setResetToken}
          />
        </div>
        <div className="row mb-2">
          <TextField
            id="password"
            label="Password"
            type="password"
            colSize={6}
            value={password}
            onChange={setPassword}
          />
          <TextField
            id="password2"
            label="Retype Password"
            type="password"
            colSize={6}
            value={password2}
            onChange={setPassword2}
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

export default ResetPassword;
