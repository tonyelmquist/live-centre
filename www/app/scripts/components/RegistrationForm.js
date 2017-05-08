import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {red500, red200} from 'material-ui/styles/colors';

const fields = [
    {name:"First Name"},
    {name:"Last Name"},
    {name:"Email"},
    {name:"Password", hidden: true},
    {name:"Repeat Password", hidden: true}
];

const style = {
    width: '90%'
};

const renderFields = (fields, style) => {
    return fields.map((field) =>
        <div key={field.name}>
            <TextField
               hintText= {field.name}
               style={style}
               type={field.hidden ? 'password' : 'text'}
           />
           <br />
        </div>
    );

};
const RegistrationForm = () => (
  <div>
    {renderFields(fields, style)}
  </div>
);

export default RegistrationForm;
