import Actions from '../constants/reduxConstants';

export default function dataOverlayReducer(state = {chatOpen: false, messages:[]}, action) {
    switch (action.type) {
        case Actions.GET_MESSAGE:
        case Actions.SEND_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        user: action.user,
                        message: action.message,
                    }
                ]
            };
        case Actions.TOGGLE_CHAT_MENU:
            return {
                ...state,
                chatOpen: !state.chatOpen
            };
        case Actions.CLEAR_MESSAGES:
            return {};
        default:
            return state;
    }
}
