import Actions from '../constants/reduxConstants';

export default function loginState(state = false, action) {
    switch (action.type) {
        case Actions.LOGIN_SUCCESS:
            return true;
        case Actions.LOGOUT_SUCCESS:
            return false;
        default:
            return state;
    }
}
