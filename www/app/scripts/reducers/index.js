import {combineReducers} from 'redux';
import sidebarState from './sidebarReducer';
import loginState from './loginReducer';
import langReducer from './langReducer';
import {showBottomNav, changeNavIndex} from './navReducer';

const rootReducer = combineReducers({
    lang: langReducer,
    isSidebarVisible: sidebarState,
    isUserLoggedIn: loginState,
    navMenu: combineReducers({visible: showBottomNav, index: changeNavIndex})
});

export default rootReducer;
