import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import chat from './chatReducer';
import { videosReducer, seasonReducer, seriesReducer, tagsReducer } from './fetchDataReducer';
import { headerMenuState, drawerMenuState, pageTabIndex, shadeReducer, userMenuReducer, appPaused } from './navigationReducer';
import videoOverlay from './videoOverlayReducer';
import { notificationReducer, popNotificationReducer } from './notificationReducer';
import matches from './matchDataReducer';
import { search, searchFilterTab } from './searchReducer';
import dataOverlayReducer from './dataOverlayReducer';
import modalsReducer from './modalsReducer';
import splashScreen from './splashScreenReducer';
import settings from './settingsReducer';
import overlayManager from './overlayManagerReducer';
import { showVideoCard, changeCardIndex, changeCardCategory, changeVideoInfo } from './videoCardReducer';
import { replayReducer as replay, highlightsReducer as highlights,
    handleSelection,
    videoPlayer, videoSettings } from './videoPlayerReducer';
import ecommerce from './ecommerceReducer';
import programsPageTab from './pages/programsPageReducer';
import { sports, teams, players, sportPlayerOverlay } from './pages/sportsPageReducer';


const rootReducer = combineReducers({
    appPaused,
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
    videoSettings,
    splashScreen,
    dataOverlay: dataOverlayReducer,
    headerMenuState,
    drawerMenuState,
    search,
    searchFilterTab,
    pageTabIndex,
    shade: shadeReducer,
    userMenu: userMenuReducer,
    overlayManager,
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
    videoOverlay,
    ecommerce,
});

export default rootReducer;
