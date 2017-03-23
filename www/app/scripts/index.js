//import "babel-polyfill"; Kills animations on iOS with OnsenUI
import "es6-promise";

import React from 'react';
import ReactDom from 'react-dom';
import log from 'loglevel';
import i18next from 'i18next';
import ons from 'onsenui';

import configureStore from './store/configureStore';
import Root from './root';
import { PartnerConstants } from './constants';
import { Utils } from './utils';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
//var injectTapEventPlugin = require("react-tap-event-plugin");
//injectTapEventPlugin();

const store = configureStore();
const root = (<Root store={ store } />);

window.i18next = null;
window.jsBridge = null;

log.setDefaultLevel(process.env.NODE_ENV === 'development' ? "debug" : "silent");

// Convert the po translation files to json objects
const jsonEnUS = require("../locale/en-US/strings.po");
const jsonNb = require("../locale/nb/strings.po");

Utils.initPlatforms();

//ons.platform.select('android');

// Load up the translations
i18next
    .init({
        debug: process.env.NODE_ENV === 'development',
        lng: 'en',
        fallbackLng: "en-US",
        keySeparator: false,
        interpolation: {
            escapeValue: false // not needed for react!!
        }
    }, () => {
        // resources have been loaded
        window.i18next = i18next;

        // Set the language data directly from the loaded JSON object
        window.i18next.addResources("en-US", "translation", jsonEnUS);
        window.i18next.addResources("nb", "translation", jsonNb);

/*
        // Add the product name to the language file(s) Suggestion on how to do replacements see function below
        if (process.env.LOCAL_PARTNER === PartnerConstants.SOMETHING) {
            addProductNameToLangauge("Something");
        } 
*/

        // Only load the app after the translations have successfully loaded
        ons.ready(() => ReactDom.render(
            root,
            document.getElementById('app'))
        );
    });
/*
function addProductNameToLangauge(productName) {
    const langs = ["en-US", "nb"];
    for (const lang of langs) {
        window.i18next.addResource(lang, "translation", "product.name", productName);
    }
}
*/
