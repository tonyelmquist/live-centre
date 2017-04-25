import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './containers/App';
import axios from 'axios';
import log from './middleware/logger';
import style from './constants/MuiStyle';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

//Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import {fetchMetadataSent, fetchMetadataFailed, fetchMetadataSuccess} from './actions/video';

//Redux Store
const store = createStore(rootReducer);


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
initVideoList();

//Language
i18next.init({
    lngs: ["en","nb"],
    lng: store.getState().lang,
    fallbackLng: "en",
    resources: {
        en: {
            translation: require('../locale/en_us.po')
        },
        nb: {
            translation: require('../locale/nb_no.po')
        }
    }
});



//Custom theme
const muiTheme = getMuiTheme(style);

render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));
