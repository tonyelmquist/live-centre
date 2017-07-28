import { combineReducers } from 'redux';

import { loginState, registrationDialog } from './authenticationReducer';
import chat from './chatReducer';
import { videosReducer, seasonReducer, seriesReducer, tagsReducer } from './fetchDataReducer';
import { changeNavIndex, headerMenuState, drawerMenuState } from './navigationReducer';
import overlayX from './overlayXReducer';
import { search, searchFilterTab } from './searchReducer';
import dataOverlayReducer from './secondLayerReducer';
import settings from './settingsReducer';
import { showVideoCard, changeCardIndex, changeCardCategory, changeVideoInfo } from './videoCardReducer';
import { replayReducer as replay, highlightsReducer as highlights, handleSelection } from './videoPlayerReducer';

import programsPageTab from './pages/programsPageReducer';
import { sports, teams, players, activeTeamTab, sportPlayerOverlay } from './pages/sportsPageReducer';


const rootReducer = combineReducers({
    // lang: langReducer,
    isRegistrationVisible: registrationDialog,
    isUserLoggedIn: loginState,
    index: changeNavIndex,
    videoCard: combineReducers({
        isVisible: showVideoCard,
        index: changeCardIndex,
        category: changeCardCategory,
        video: changeVideoInfo,
    }),
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
    settings,
    chat,
    replay,
    highlights,
    overlayX,
});

export default rootReducer;
