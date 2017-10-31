import { NavigationActions } from 'react-navigation';
import Navigator from '../../native/navigation/RootNavigation';

const initialState = Navigator.router.getStateForAction(NavigationActions.init());
// const recentlyVisitedRoutes = new Set();
let lastRoute = null;

export default (state = initialState, action) => {
    const nextState = Navigator.router.getStateForAction(action, state);
    // console.log(lastRoute);
    if (action.type === 'Navigation/NAVIGATE' || action.type === 'Navigation/BACK') {
        if (lastRoute === action.routeName) {
            return state;
        }
        lastRoute = action.routeName;
        // if (recentlyVisitedRoutes.has(action.routeName)) {
        //     return state;
        // }
        // recentlyVisitedRoutes.clear();
        // recentlyVisitedRoutes.add(action.routeName);
    }
    return nextState || state;
};
