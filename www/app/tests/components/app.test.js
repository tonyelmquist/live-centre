'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import { shallow, mount, render } from "enzyme";
import {assert, expect} from 'chai';
import App from '../../scripts/containers/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import style from '../../scripts/constants/MuiStyle';
//Redux
import { Provider } from 'react-redux';

import initLang from '../../scripts/utils/i18nextInit';
import store from '../../scripts/utils/store';
// import {fetchMetadataSent, fetchMetadataFailed, fetchMetadataSuccess} from './actions/video';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
//Custom theme
const muiTheme = getMuiTheme(style);

initLang(store);
describe("<App />",() => {
    let appWraper; //Enzyme react wrapper around App component

    //Function that renders app
    const renderApp = () => {
        if(!appWraper){
            appWraper = mount(
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </MuiThemeProvider>
            );
        };
        return appWraper;
    };

    beforeEach(() => {
        appWraper = undefined;
    });
    //Tests

    it('always render App', ()=> {
        const app = renderApp().find("App");
        expect(app.length).to.equal(1);
    });
});
