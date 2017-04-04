import React from 'react';
import {render} from 'react-dom';
import App from './components/app';
import log from './middleware/logger'

render( <App /> , document.getElementById('root'));
