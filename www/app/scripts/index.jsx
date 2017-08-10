import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import App from './containers/App';
import style from './constants/MuiStyle';
import initLang from './utils/i18nextInit';
import store from './utils/store';
import initVideos from './utils/initVideos';
import initFirebase from './utils/initFirebase';
import Authentication from './utils/Authentication';
import FirebaseDB from './utils/FirebaseDB';
// import io from 'socket.io-client';
import initChangingScores from './utils/initScoreChanger';
import initUserSettings from './utils/initUserSettings';

// Enable Touch/Tap Events
injectTapEventPlugin();

// Initialize Video List
initVideos(store);

// init scores overlay
initChangingScores(store);

// Language: i18next Initialize
initLang(store);

initUserSettings(store);

// Init Firebase
initFirebase();

// Init Authentication
Authentication.init();

// Init FirebaseDB
// const fdb = new FirebaseDB();
// console.log('init firebase');
// fdb.initListeners();

// capture back button

window.jsBridge = {};

window.jsBridge.onBackPressed = () => {
    window.alert('you pressed the back button! now do with this what you will...');
};

// Custom theme
const muiTheme = getMuiTheme(style);

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
    document.getElementById('root'));
