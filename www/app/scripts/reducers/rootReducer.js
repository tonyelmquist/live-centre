import {combineReducers} from 'redux';
// import sidebarState from './sidebarReducer';
import {loginState, registrationDialog} from './loginReducer';
import langReducer from './langReducer';
import videosReducer from './videosReducer';
import playbackReducer from './playbackReducer';
import dataOverlayReducer from './dataOverlayReducer';
import {changeNavIndex, headerMenuState} from './navReducer';
import {search, filter} from './searchReducer';
import {showVideoCard, changeCardIndex, changeCardCategory, changeVideoInfo} from './videoCardReducer';
import overlayReducer from './productOverlayReducer';

const rootReducer = combineReducers({
    lang: langReducer,
    isRegistrationVisible: registrationDialog,
    isUserLoggedIn: loginState,
    index: changeNavIndex,
    overlay: combineReducers({isVisible: overlayReducer}),
    videoCard: combineReducers({
        isVisible: showVideoCard,
        index: changeCardIndex,
        category: changeCardCategory,
        url: changeVideoInfo
    }),
    videos: videosReducer,
    playback: playbackReducer,
    dataOverlay: dataOverlayReducer,
    headerMenuState : headerMenuState,
    search: search,
    filter: filter
});

export default rootReducer;
