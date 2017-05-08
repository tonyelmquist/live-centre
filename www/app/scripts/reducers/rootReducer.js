import {combineReducers} from 'redux';
// import sidebarState from './sidebarReducer';
import {loginState, registrationDialog} from './loginReducer';
import langReducer from './langReducer';
import videosReducer from './videosReducer';
import playbackReducer from './playbackReducer';
import dataOverlayReducer from './dataOverlayReducer';
import {sendClientMessage, getServerMessage} from './chatMessageReducer';
import {showBottomNav, changeNavIndex} from './navReducer';

const rootReducer = combineReducers({
    lang: langReducer,
    isRegistrationVisible: registrationDialog,
    isUserLoggedIn: loginState,
    navMenu: combineReducers({visible: showBottomNav, index: changeNavIndex}),
    videos: videosReducer,
    playback: playbackReducer,
    dataOverlay: dataOverlayReducer,
    chatMessage: combineReducers({serverMessage: getServerMessage, clientMessage: sendClientMessage}),
});

export default rootReducer;
