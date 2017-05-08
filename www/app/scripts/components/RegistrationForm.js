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

const RegistrationForm = () => (
  <div>
    <TextField
       hintText="First Name"
       underlineStyle={styles.underlineStyle}
    />
    <br />
    <TextField
        hintText="Last Name"
        underlineStyle={styles.underlineStyle}
    />
    <br />
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
     <TextField
         hintText="Repeat Password"
         underlineStyle={styles.underlineStyle}
         type="password"
     />
     <br />
  </div>
);

export default RegistrationForm;
