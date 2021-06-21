import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Body from 'components/layouts/Body';
import TextField from 'components/common/input/TextField';
import API from 'utils/API';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';

import { SET_CURRENT_USER } from 'actions/types';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatchNotification = useNotificationDispatcher();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const _onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        dispatchNotification({
          title: 'Alert',
          message: 'fields are empty!',
        });
      }
      const data = { email, password };
      const res = await API.post('/auth/login', data);
      localStorage.setItem('jwtToken', res.data);
      dispatch({ type: SET_CURRENT_USER, payload: res.data });
    } catch (err) {
      dispatchNotification({
        title: 'Alert',
        message: err?.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <Body
      title="User Login"
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
        <div className="row mb-2">
          <TextField
            id="password"
            label="Password"
            type="password"
            colSize={6}
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className="mx-1">
          <button type="submit" className="btn btn-primary">LOGIN</button>
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

export default Login;
