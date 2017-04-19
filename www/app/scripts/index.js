import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './components/app';
import log from './middleware/logger';
import style from './constants/MuiStyle';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//Custom theme
const muiTheme = getMuiTheme(style);

render(
    <MuiThemeProvider muiTheme={muiTheme}>
            <App />
    </MuiThemeProvider>,
    document.getElementById('root'));
