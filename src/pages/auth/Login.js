import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Body from 'components/layouts/Body';
import TextField from 'components/common/input/TextField';
import API from 'utils/API';
import { SET_CURRENT_USER } from 'actions/types';

const Login = () => {
  const [email, setEmail] = useState('benny@gmail.com');
  const [password, setPassword] = useState('1234');
  const dispatch = useDispatch();

  const _onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert('fields are empty!');
      }
      const data = { email, password };
      const res = await API.post('/auth/login', data);
      localStorage.setItem('jwtToken', res.data);
      dispatch({ type: SET_CURRENT_USER, payload: res.data });
    } catch (err) {
      alert(err.response.data.message);
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
            colSize={6}
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className="mx-1">
          <button type="submit" className="btn btn-primary">LOGIN</button>
        </div>
      </form>
    </Body>
  );
};

export default Login;
