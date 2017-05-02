'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
//Redux
import { Provider } from 'react-redux';
import store from '../scripts/utils/store';
//Testing Libraries
import TestUtils from 'react-dom';
import { shallow, mount, render } from "enzyme";
import {assert, expect} from 'chai';
//Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import style from '../scripts/constants/MuiStyle';
//Language support
import initLang from '../scripts/utils/i18nextInit';
//Tap Event Plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
//Custom theme
const muiTheme = getMuiTheme(style);
//i18next initialization
initLang(store);

// Call inject tap event plugin once
// (() => {
//     let executed = false;
//     return () => {
//         if (!executed) {
//             executed = true;
//             injectTapEventPlugin();
//         }
//     };
// })();

//Renders a component
const enzymeMount = (ComponentClass, props = {}, state = {}) => {
  //Enzyme react wrapper around App component
  const wrapper = mount(
      <MuiThemeProvider muiTheme={muiTheme}>
          <Provider store={store}>
              <ComponentClass {...props}/>
          </Provider>
      </MuiThemeProvider>
  );


  return wrapper;
};

export {enzymeMount, expect, assert};
