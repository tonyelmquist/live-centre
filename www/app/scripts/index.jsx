import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import App from './webapp/containers/App';
import style from './shared/constants/MuiStyle';
import initLang from './shared/utils/i18nextInit';
import store from './shared/utils/store';
import initVideos from './shared/utils/initVideos';
import initFirebase from './shared/utils/initFirebase';
import initTeamData from './shared/utils/initTeamData';
import { getMatchData } from './shared/utils/loadMatchData';
import Authentication from './shared/utils/Authentication';
// import FirebaseDB from './shared/utils/FirebaseDB';
// import io from 'socket.io-client';
// import initUserSettings from './shared/utils/initUserSettings';

// Enable Touch/Tap Events
injectTapEventPlugin();

// Initialize Video List
initVideos(store);

// Language: i18next Initialize
initLang(store);

// initUserSettings(store);

// Init Firebase
initFirebase();

// Init 10 teams for sport page
// initTeamData();

// Init Authentication
Authentication.init();

// Init FirebaseDB
// const fdb = new FirebaseDB();
// console.log('init firebase');
// fdb.initListeners();

// capture back button

// window.jsBridge = {};

// window.jsBridge.onBackPressed = () => {
//     // window.alert('you pressed the back button! now do with this what you will...');
// };

// Custom theme
const muiTheme = getMuiTheme(style);

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
    document.getElementById('root'));
