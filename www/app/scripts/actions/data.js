import axios from 'axios';
import log from 'loglevel';

import { ReduxConstants, RestAPI } from '../constants';
import { setInProgress } from './progress';

function receiveData(key, data) {
    return {
        type: ReduxConstants.DATA_SUCCESS,
        payload: {
            key: key,
            data: data
        }
    };
}

// Fetches data and stores it in the store
//
// fetchData takes RestConfig object which is defined in the RestAPI.
// The returned RestConfig object has chaining function to modify the
// url or data sent.
//
// Global axios defaults are used to set the baseURL, and auth and
// content type headers for all requests
//
// Full details here: https://github.com/mzabriskie/axios
//
// Examples
//
// fetchData(RestAPI.LOGIN.appendUrl(id).setData({ somedata: "something" }))
//

export function fetchData(restConfig) {
    return function(dispatch) {
        dispatch(setInProgress(restConfig.getKey(), true, true));
        return axios(restConfig.getConfig())
            .then((response) => {
                dispatch(setInProgress(restConfig.getKey(), false, true));
                dispatch(receiveData(restConfig.getKey(), response.data));
            })
            .catch((error) => {
                log.error("fetch capture error: ", error);
                dispatch(setInProgress(restConfig.getKey(), false, false, error.response.data));
                log.debug(`fetchData error: ${error.response.data.message}`);
            });
    };
}

// Sets the data to null in the data store

function resetData(key) {
    return {
        type: ReduxConstants.DATA_REMOVE,
        payload: {
            key: key
        }
    };
}

// Helper functions
export function login(email, password) {
    return function(dispatch) {
        dispatch(fetchData(RestAPI.LOGIN.setParams({email: email, password: password})));

        return Promise.resolve();
    };
}

export function verify(code, token) {
    return function(dispatch) {
        dispatch(fetchData(RestAPI.VERIFY.setParams({code: code, token: token})));

        return Promise.resolve();
    };
}

export function logout() {
    // Hack until I fix this properly
    localStorage.removeItem(ReduxConstants.REDUX_LOCAL_STORAGE_KEY_NAME);
    return function(dispatch) {
        dispatch(resetData(ReduxConstants.REST_LOGIN));
        dispatch(resetData(ReduxConstants.REST_VERIFY));

        return Promise.resolve();
    };
}

export function getCameraSnapshots(token) {
    return function(dispatch) {
        dispatch(fetchData(RestAPI.CAMERAS.setParams({token: token})));

        return Promise.resolve();
    };
}

