import React from 'react';
import {render} from 'react-dom';
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


//Redux
import { Provider } from 'react-redux';
import {fetchMetadataSent, fetchMetadataFailed, fetchMetadataSuccess} from './actions/video';
import {changeScore} from './actions/score';


//Enable Touch/Tap Events
injectTapEventPlugin();

//Initialize Video List
initVideoList(store);
initChangingScores();
const initChangingScores = () => {
    var socket = new WebSocket('ws://localhost:8080');
        socket.onmessage = function(event) {
          store.dispatch(changeScore(event.data));
        };
}   

//Language: i18next Initialize
initLang(store);

//Custom theme
const muiTheme = getMuiTheme(style);
// console.log(store.getState());
render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));
