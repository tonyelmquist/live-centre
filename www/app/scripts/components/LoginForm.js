import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { red500, purple200 } from 'material-ui/styles/colors';

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
