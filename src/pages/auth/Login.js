import React from 'react';
import Body from 'components/layouts/Body';
import TextField from 'components/common/input/TextField';

const Login = () => (
  <Body
    title="User Login"
  >
    <div className="row mb-2 mt-4">
      <TextField
        label="Email"
        colSize={6}
      />
    </div>
    <div className="row mb-2">
      <TextField
        label="Password"
        colSize={6}
      />
    </div>
  </Body>
);

export default Login;
