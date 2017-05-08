import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {red500, purple200} from 'material-ui/styles/colors';

const styles = {
  marginLeft: 20,
  errorStyle: {
    color: red500,
  },
  underlineStyle: {
    borderColor: purple200,
  }
};

const UserForm = () => (
  <div>
    <TextField
         hintText="Email"
         underlineStyle={styles.underlineStyle}
     />
     <br />
     <TextField
         hintText="Password"
         underlineStyle={styles.underlineStyle}
         type="password"
     />
     <br />
  </div>
);

export default UserForm;
