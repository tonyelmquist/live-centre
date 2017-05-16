import {combineReducers} from 'redux';
// import sidebarState from './sidebarReducer';
import {loginState, registrationDialog} from './loginReducer';
import langReducer from './langReducer';
import videosReducer from './videosReducer';
import playbackReducer from './playbackReducer';
import dataOverlayReducer from './dataOverlayReducer';
import {changeNavIndex, headerMenuState} from './navReducer';
import {showBottomNav, changeNavIndex} from './navReducer';
import {showVideoCard, changeCardIndex} from './videoCardReducer';

const rootReducer = combineReducers({
    lang: langReducer,
    isRegistrationVisible: registrationDialog,
    isUserLoggedIn: loginState,
    index: changeNavIndex,
    videoCard: combineReducers({isVisible: showVideoCard, index: changeCardIndex}),
    navMenu: combineReducers({visible: showBottomNav, index: changeNavIndex}),
    videos: videosReducer,
    playback: playbackReducer,
    dataOverlay: dataOverlayReducer,
    headerMenuState : headerMenuState,
});

export default rootReducer;
