import Actions from '../constants/reduxConstants';

export default function modalsReducer(state = { showLoginModal: false }, action) {
    switch (action.type) {
    case Actions.SHOW_LOGIN_MODAL:
        return {
            ...state,
            showLoginModal: action.isOpen,
        };
    default:
        return state;
    }
}
