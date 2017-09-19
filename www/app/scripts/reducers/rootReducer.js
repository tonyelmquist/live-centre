import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import chat from './chatReducer';
import { videosReducer, seasonReducer, seriesReducer, tagsReducer } from './fetchDataReducer';
import { headerMenuState, drawerMenuState, pageTabIndex, shadeReducer, userMenuReducer } from './navigationReducer';
import VideoOverlay from './VideoOverlayReducer';
import { notificationReducer, popNotificationReducer } from './notificationReducer';
import matches from './matchDataReducer';
import { search, searchFilterTab } from './searchReducer';
import dataOverlayReducer from './secondLayerReducer';
import modalsReducer from './modalsReducer';
import settings from './settingsReducer';
import { showVideoCard, changeCardIndex, changeCardCategory, changeVideoInfo } from './videoCardReducer';
import { replayReducer as replay, highlightsReducer as highlights, 
    handleSelection, productOverlayReducer, productThumbReducer,
    videoPlayer } from './videoPlayerReducer';

import programsPageTab from './pages/programsPageReducer';
import { sports, teams, players, sportPlayerOverlay } from './pages/sportsPageReducer';


const rootReducer = combineReducers({
    authentication: authenticationReducer,
    videoCard: combineReducers({
        isVisible: showVideoCard,
        index: changeCardIndex,
        category: changeCardCategory,
        video: changeVideoInfo,
    }),
    modals: modalsReducer,
    programsPage: programsPageTab,
    videos: videosReducer,
    playback: handleSelection,
    videoPlayer,
    dataOverlay: dataOverlayReducer,
    headerMenuState,
    drawerMenuState,
    search,
    searchFilterTab,
    pageTabIndex,
    shade: shadeReducer,
    userMenu: userMenuReducer,
    series: seriesReducer,
    sportsPage: combineReducers({ sportPlayerOverlay }),
    sportsInfo: combineReducers({ sports, teams, players, matches }),
    tags: tagsReducer,
    seasons: seasonReducer,
    notifications: combineReducers({
        popNotifications: popNotificationReducer,
        notifications: notificationReducer,
    }),
    settings,
    chat,
    replay,
    highlights,
    VideoOverlay,
    productOverlay: productOverlayReducer,
    productThumb: productThumbReducer,
});

export default rootReducer;
