import { combineReducers } from 'redux';
import { Dimensions } from 'react-native';
import Actions from '../constants/ActionTypes';

const { width, height } = Dimensions.get('window');
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
const initialLayout = width > height ? 'LANDSCAPE' : 'PORTRAIT';

const connection = (state = null, action) => {
    switch (action.type) {
        case Actions.CONNECTION_STATUS_CHANGE:
            return action.data;
        default:
            return state;
    }
};

const orientation = (state = initialLayout, action) => {
    switch (action.type) {
        case Actions.ORIENTATION_CHANGE:
            return action.data;
        default:
            return state;
    }
};

const immersive = (state = false, action) => {
    switch (action.type) {
        case Actions.IMMERSIVE_MODE_CHANGE:
            return action.data;
        default:
            return state;
    }
};

const statusBar = (state = false, action) => {
    switch (action.type) {
        case Actions.STATUSBAR_STATE_CHANGE:
            return action.data;
        default:
            return state;
    }
};

const appState = (state = 'active', action) => {
    switch (action.type) {
        case Actions.APP_STATE_CHANGE:
            return action.data;
        default:
            return state;
    }
};

const dimensions = (state = { width, height, screenWidth, screenHeight }, action) => {
    switch (action.type) {
        case Actions.DIMENSIONS_CHANGE:
            const { width, height } = Dimensions.get('window');
            const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
            return { width, height, screenWidth, screenHeight };
        default:
            return state;
    }
};

export default combineReducers({
    isConnected: connection,
    isImmersive: immersive,
    isStatusBarHidden: statusBar,
    dimensions,
    orientation,
    appState
});
