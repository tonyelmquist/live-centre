import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import App from './webapp/containers/App';
import style from '../../native/shared/constants/MuiStyle';
import initLang from '../../native/shared/utils/i18nextInit';
import store from '../../native/shared/utils/storeWeb';
import initVideos from '../../native/shared/utils/initVideosWeb';
import initFirebase from '../../native/shared/utils/initFirebase';
import initTeamData from '../../native/shared/utils/initTeamData';
import { getMatchData } from '../../native/shared/utils/loadMatchData';
import Authentication from '../../native/shared/utils/Authentication';
// import FirebaseDB from '../../native/shared/utils/FirebaseDB';
// import io from 'socket.io-client';
// import initUserSettings from '../../native/shared/utils/initUserSettings';

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
