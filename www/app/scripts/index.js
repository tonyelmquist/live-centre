import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './containers/App';
import axios from 'axios';
import log from './middleware/logger';
import style from './constants/MuiStyle';
import injectTapEventPlugin from 'react-tap-event-plugin';
import initLang from './utils/i18nextInit';
import store from './utils/store';
import initVideoList from './utils/initVideos';
import initTempBackend from './utils/initTempBackend';
import initChangingScores from './utils/initScoreChanger';
import initUserSettings from './utils/initUserSettings';

// Redux
import { Provider } from 'react-redux';

// Enable Touch/Tap Events
injectTapEventPlugin();

// Initialize Video List
initVideoList(store);

// init scores overlay
initChangingScores(store);

// Language: i18next Initialize
initLang(store);


initUserSettings(store);

//initTempBackend(store);


// Custom theme
const muiTheme = getMuiTheme(style);

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
    document.getElementById('root'));
