import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './containers/App';
import log from './middleware/logger';
import style from './constants/MuiStyle';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';

//Redux Store
const store = createStore(rootReducer);

// console.log(store.getState());
//Language
i18next.init({
    lng: store.getState().lang,
    lngs: ["en","nb"],
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
