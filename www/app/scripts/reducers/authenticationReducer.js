import Actions from '../constants/reduxConstants';

export default function authenticationReducer(state = { isLoggedIn: false, user: [], loginFormError: false }, action) {
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
    case Actions.AUTH_SET_DISPLAY_NAME:
        return {
            ...state,
            user: {
                ...state.user,
                displayName: action.name,
            },
        };
    case Actions.SET_LOGIN_FORM_ERROR:
        return {
            ...state,
            loginFormError: action.error,
        };
    default:
        return state;
    }
}
