import React from 'react';
// import Divider from 'material-ui/Divider';
// import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const fieldsDefault = [
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Email' },
];

const styleDefault = {
    width: '90%',
};

const renderFields = (fields, style) => fields.map(field =>
        (<div key={field.name}>
          <TextField
            hintText={field.name}
            style={style}
            type={field.hidden ? 'password' : 'text'}
          />
          <br />
        </div>),
    );
const RegistrationForm = () => (
  <div id="registrationForm">
    {renderFields(fieldsDefault, styleDefault)}
  </div>
);

export default RegistrationForm;
