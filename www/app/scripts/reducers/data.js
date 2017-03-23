import omit from 'object.omit';

import { createReducer } from '../utils';
import { ReduxConstants } from '../constants';

const initialState = {
    responses: {}
};

export default createReducer(initialState, {
    [ReduxConstants.DATA_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'responses': {
                ...state.responses,
                [payload.key]: payload.data
            }
        });
    },
    [ReduxConstants.DATA_REMOVE]: (state, payload) => {
        return Object.assign({}, state, {
            'responses': omit(state.responses, payload.key)
        });
    }
});


