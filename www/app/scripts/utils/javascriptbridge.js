import log from 'loglevel';

import { ReduxConstants } from '../constants';

'use strict';

class JavascriptBridge {
    constructor(actions, isAndroid, isiOS) {
        this._actions = actions;
        this._android = !!isAndroid;
        this._ios = !!isiOS;
        this._responseCallbacks = {};
        this._uniqueId = 1;

        // When this is created get everything running to start
        this.onResume();

        // Add on the function Onsen UI calls (and Cordova expects) when the Android back button
        // runs out of pages to navigate back to and asks the app to exit
        navigator.app = {};
        navigator.app.exitApp = () => { this.exitApp(); };
    }

    isActive() {
        return true;
    }

    setLocation(/*data*/) {

    }

    isNotificationShowing() {
        return JSON.stringify({visible: false});
    }

    onPause() {
        this._actions.setInProgress(ReduxConstants.POLLING_ACTIVE_KEY, false, true);
    }

    onResume() {
        this._actions.setInProgress(ReduxConstants.POLLING_ACTIVE_KEY, true, true);
    }

    onBackPressed() {
        document.dispatchEvent(this._createEvent('backbutton'));
    }

    callback(callbackFnName, data) {
        if (data == undefined || data == null) {
            return this._responseCallbacks[callbackFnName]();
        }
        return this._responseCallbacks[callbackFnName](JSON.parse(data));
    }

    getVersion(callback) {
        this._buildAPIFunction("getVersion", {}, callback, {version: "1.0"});
    }

    getStatusbarStyle(callback) {
        this._buildAPIFunction("getStatusbarStyle", {}, callback, {lightContent: false});
    }

    setStatusbarStyle(lightContent, persist) {
        // Default persisting the setting
        if (persist == undefined || persist == null) {
            persist = true;
        }

        this._buildAPIFunction("setStatusbarStyle", {lightContent: lightContent, persist: persist});
    }

    resetStatusbarStyle() {
        this._buildAPIFunction("resetStatusbarStyle", {});
    }

    exitApp() {
        this._buildAPIFunction("exitApp", {});
    }

    _buildAPIFunction(funcName, data, callback, webClientData) {
        if (this._android || this._ios) {

            let callbackId = "";
            if (callback != null) {
                callbackId = `cb_${this._uniqueId++}_${new Date().getTime()}`;
                this._responseCallbacks[callbackId] = (data) => {
                    callback(data);
                };
            }

            data = JSON.stringify(Object.assign({}, {func: funcName}, callback == null ? {} : {callbackId: callbackId}, data));

            if (this._android) {
                log.trace(`Data passed to Android app: ${data}`);

                // Can be undefined if running in in Chrome in responsive design mode
                if (window.tfgNative != undefined) {
                    window.tfgNative.jsBridge(`tfg://${data}`);
                }
            }
            else if (this._ios) {
                log.trace(`Data passed to iOS app: ${data}`);

                let iframe = document.createElement("IFRAME");
                iframe.setAttribute("src", `tfg://${data}`);
                iframe.className = "msgFrame";
                document.documentElement.appendChild(iframe);
                iframe.parentNode.removeChild(iframe);
                iframe = null;
            }
            else {
                log.error("Unsupported device");
            }
        }
        else {
            if (callback != null) {
                callback(webClientData);
            }
        }
    }

    _createEvent(type, data) {
        const event = document.createEvent('Events');
        event.initEvent(type, false, false);
        if (data) {
            for (const i in data) {
                if (data.hasOwnProperty(i)) {
                    event[i] = data[i];
                }
            }
        }
        return event;
    }
}

export default JavascriptBridge;

