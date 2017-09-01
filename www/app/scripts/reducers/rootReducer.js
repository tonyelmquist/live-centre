import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import chat from './chatReducer';
import { videosReducer, seasonReducer, seriesReducer, tagsReducer } from './fetchDataReducer';
import { headerMenuState, drawerMenuState, pageTabIndex } from './navigationReducer';
import overlayX from './overlayXReducer';
import { notificationReducer, popNotificationReducer } from './notificationReducer';
import matches from './matchDataReducer';
import { search, searchFilterTab } from './searchReducer';
import dataOverlayReducer from './secondLayerReducer';
import modalsReducer from './modalsReducer';
import settings from './settingsReducer';
import { showVideoCard, changeCardIndex, changeCardCategory, changeVideoInfo } from './videoCardReducer';
import { replayReducer as replay, highlightsReducer as highlights, handleSelection, productOverlayReducer, productThumbReducer } from './videoPlayerReducer';

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
    dataOverlay: dataOverlayReducer,
    headerMenuState,
    drawerMenuState,
    search,
    searchFilterTab,
    pageTabIndex,
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
    overlayX,
    productOverlay: productOverlayReducer,
    productThumb: productThumbReducer,
});

export default rootReducer;
