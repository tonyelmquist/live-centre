import {combineReducers} from 'redux';
// import sidebarState from './sidebarReducer';
import {loginState, registrationDialog} from './loginReducer';
import langReducer from './langReducer';
import playbackReducer from './playbackReducer';
import dataOverlayReducer from './dataOverlayReducer';
import {changeNavIndex, headerMenuState} from './navReducer';
import {search, filter} from './searchReducer';
import {showVideoCard, changeCardIndex, changeCardCategory} from './videoCardReducer';
import overlayReducer from './productOverlayReducer';
import {videosReducer, seasonsReducer, seriesReducer, channelsReducer, tagsReducer} from './fetchDataReducer';


const rootReducer = combineReducers({
    lang: langReducer,
    isRegistrationVisible: registrationDialog,
    isUserLoggedIn: loginState,
    index: changeNavIndex,
    overlay: combineReducers({isVisible: overlayReducer}),
    videoCard: combineReducers({isVisible: showVideoCard, index: changeCardIndex, category: changeCardCategory}),
    playback: playbackReducer,
    dataOverlay: dataOverlayReducer,

    headerMenuState : headerMenuState,

    search: search,
    filter: filter,

    videos: videosReducer,
    series: seriesReducer,
    channels: channelsReducer,
    seasons: seasonsReducer,
    tags: tagsReducer,
});

export default rootReducer;
