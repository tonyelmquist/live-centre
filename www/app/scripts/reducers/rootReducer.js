import {combineReducers} from 'redux';
import sidebarState from './sidebarReducer';
import loginState from './loginReducer';
import langReducer from './langReducer';
import videosReducer from './videosReducer';
import playbackReducer from './playbackReducer';
import dataOverlayReducer from './dataOverlayReducer';
import {showBottomNav, changeNavIndex} from './navReducer';

const rootReducer = combineReducers({
    lang: langReducer,
    isSidebarVisible: sidebarState,
    isUserLoggedIn: loginState,
    navMenu: combineReducers({visible: showBottomNav, index: changeNavIndex}),
    videos: videosReducer,
    playback: playbackReducer,
    dataOverlay: dataOverlayReducer,
});

export default rootReducer;
