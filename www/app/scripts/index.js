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

injectTapEventPlugin();

//Redux
import { Provider } from 'react-redux';
import {fetchMetadataSent, fetchMetadataFailed, fetchMetadataSuccess} from './actions/video';
import {changeScore} from './actions/score';

//Initialize Video List
const initVideoList = () => {
    const config = {
      searchTerm: 'Lost',
      url: 'https://api-eu1.mediabank.me/mediabank/asset/'
    };

    store.dispatch(fetchMetadataSent());

    axios({
      method: 'get',
      url: `${config.url}{"query_string":"${config.searchTerm}"}`,
      headers: {
        'Mediabank-API-Token': 'EqLlE0nhEr2oLQ8E64c7oNy5bchS3Nu1I0pJVsBhjEDxI2pJVsBLNED4YQ',
      },
      auth: {
        username: 'api',
        password: 'tv$&?QkD=8GBpvKD'
      }
    })
    .then( (result) => {
        const filteredAssets = result.data.assets.filter( (asset)=> {
          return asset.metadata.MimeType === 'video';
        });
        store.dispatch(fetchMetadataSuccess(filteredAssets));
    });
};

const initChangingScores = () => {
    var socket = new WebSocket('ws://localhost:8080');
        socket.onmessage = function(event) {
          store.dispatch(changeScore(event.data));
        };
}   



initVideoList();
initChangingScores();

//Language: i18next Initialize
initLang(store);

//Custom theme
const muiTheme = getMuiTheme(style);

render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));
