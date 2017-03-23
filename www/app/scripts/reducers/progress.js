import { createReducer } from '../utils';
import { ReduxConstants } from '../constants';

const initialState = {
    states: {}
};

export default createReducer(initialState, {
    [ReduxConstants.RESET_INPROGRESS]: (state) => {
        return Object.assign({}, state, initialState);
    },
    [ReduxConstants.INPROGRESS]: (state, payload) => {
        return Object.assign({}, state, {
            'states': {
                ...state.states,
                [payload.key]: {
                    key: payload.key,
                    inProgress: payload.inProgress,
                    isSuccess: payload.isSuccess,
                    data: payload.data
                }
            }
        });
    }
});

