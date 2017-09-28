import Actions from '../constants/reduxConstants';

const initialState = {
    isReady: false,
    isShowing: false,
};

function splashScreen(state = initialState, action) {
    switch (action.type) {
    case Actions.SET_SPLASH_READY:
        return Object.assign({}, state, {
            isReady: action.isReady,
        });
    case Actions.SET_SPLASH_SHOWING:
        return Object.assign({}, state, {
            isShowing: action.isShowing,
        });
    default:
        return state;
    }
}

export default splashScreen;
