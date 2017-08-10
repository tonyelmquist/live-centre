import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import chat from './chatReducer';
import { videosReducer, seasonReducer, seriesReducer, tagsReducer } from './fetchDataReducer';
import { changeNavIndex, headerMenuState, drawerMenuState } from './navigationReducer';
import overlayX from './overlayXReducer';
import notificationReducer from './notificationReducer';
import { search, searchFilterTab } from './searchReducer';
import dataOverlayReducer from './secondLayerReducer';
import modalsReducer from './modalsReducer';
import settings from './settingsReducer';
import { showVideoCard, changeCardIndex, changeCardCategory, changeVideoInfo } from './videoCardReducer';
import { replayReducer as replay, highlightsReducer as highlights, handleSelection, productOverlayReducer, productThumbReducer } from './videoPlayerReducer';

import programsPageTab from './pages/programsPageReducer';
import { sports, teams, players, activeTeamTab, sportPlayerOverlay } from './pages/sportsPageReducer';


const rootReducer = combineReducers({
    authentication: authenticationReducer,
    index: changeNavIndex,
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
    series: seriesReducer,
    sportsPage: combineReducers({ activeTeamTab, sportPlayerOverlay }),
    sportsInfo: combineReducers({ sports, teams, players }),
    tags: tagsReducer,
    seasons: seasonReducer,
    notifications: notificationReducer,
    settings,
    chat,
    replay,
    highlights,
    overlayX,
    productOverlay: productOverlayReducer,
    productThumb: productThumbReducer,
});

export default rootReducer;
