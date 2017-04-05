import React from 'react';
import {render} from 'react-dom';
import App from './components/app';
import log from './middleware/logger';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

render( <App /> , document.getElementById('root'));
