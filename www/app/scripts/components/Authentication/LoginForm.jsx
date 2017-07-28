import React from 'react';
import TextField from 'material-ui/TextField';

const style = {
    width: '90%',
};

const LoginForm = () => (
  <div id="loginForm">
    <TextField
      hintText="Email"
      style={style}
      fullWidth
    />
    <br />
    <TextField
      hintText="Password"
      style={style}
      type="password"
      fullWidth
    />
    <br />
  </div>
);

export default LoginForm;
