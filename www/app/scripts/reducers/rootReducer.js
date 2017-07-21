import { combineReducers } from 'redux';
// import sidebarState from './sidebarReducer';
import { loginState, registrationDialog } from './loginReducer';
// import langReducer from './langReducer';
import playbackReducer from './playbackReducer';
import dataOverlayReducer from './dataOverlayReducer';
import { changeNavIndex, headerMenuState, drawerMenuState } from './navReducer';
import { search, searchFilterTab } from './searchReducer';
import { showVideoCard, changeCardIndex, changeCardCategory, changeVideoInfo } from './videoCardReducer';
import overlayReducer from './productOverlayReducer';
import { videosReducer, seasonReducer, seriesReducer, tagsReducer } from './fetchDataReducer';
import settings from './settingsReducer';
import chat from './chatReducer';
import replay from './replayReducer';
import highlights from './highlightsReducer';
import overlayX from './overlayXReducer';
import programsPageTab from './programsPageReducer';
import {sports, teams, players, activeTeamTab, activePlayer, activePlayerTab} from './sportReducer';


const rootReducer = combineReducers({
    // lang: langReducer,
    isRegistrationVisible: registrationDialog,
    isUserLoggedIn: loginState,
    index: changeNavIndex,
    overlay: combineReducers({ isVisible: overlayReducer }),
    videoCard: combineReducers({
        isVisible: showVideoCard,
        index: changeCardIndex,
        category: changeCardCategory,
        video: changeVideoInfo,
    }),
    programsPage: programsPageTab,
    videos: videosReducer,
    playback: playbackReducer,
    dataOverlay: dataOverlayReducer,
    headerMenuState,
    drawerMenuState,
    search,
    searchFilterTab,
    series: seriesReducer,
    sportsPage: combineReducers({activeTeamTab, activePlayer, activePlayerTab}),
    sportsInfo : combineReducers({sports, teams, players}),
    tags: tagsReducer,
    seasons: seasonReducer,
    settings,
    chat,
    replay,
    highlights,
    overlayX
});

export default rootReducer;
