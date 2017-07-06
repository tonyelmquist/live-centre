import Actions from '../constants/reduxConstants';

export default function dataOverlayReducer(state = { chatOpen: false, messages: [] }, action) {
    switch (action.type) {
    case Actions.GET_MESSAGE:
        return {
            ...state,
            messages: [
                ...state.messages,
                {
                    id: action.id,
                    user: action.user,
                    message: action.message,
                },
            ],
        };
    case Actions.SEND_MESSAGE:
    case Actions.TOGGLE_CHAT_MENU:
        return {
            ...state,
            chatOpen: !state.chatOpen,
        };
    case Actions.CLEAR_MESSAGES:
        return {
            ...state,
            messages: [],
        };
    default:
        return state;
    }
}
