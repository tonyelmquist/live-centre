import Actions from '../constants/reduxConstants';

export default function authenticationReducer(state = { isLoggedIn: false, user: [] }, action) {
    switch (action.type) {
    case Actions.LOGIN_SUCCESS:
        return {
            ...state,
            isLoggedIn: true,
            user: action.user,
        };
    case Actions.LOGOUT_SUCCESS:
        return {
            ...state,
            isLoggedIn: false,
            user: [],
        };
    default:
        return state;
    }
}
