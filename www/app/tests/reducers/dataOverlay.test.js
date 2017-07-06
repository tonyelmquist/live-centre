import { assert, expect } from 'chai';
import dataOverlayReducer from '../../scripts/reducers/dataOverlayReducer';
import actions from '../../scripts/constants/reduxConstants';


describe('Data Overlay Reducer', () => {
    const action = {};

    it('should return the initial state', () => {
        assert.deepEqual(dataOverlayReducer(undefined, action), { team1Score: 0, team2Score: 0 }, 'should be equal');
        action.type = 'DEFAULT';
        assert.deepEqual(dataOverlayReducer({ team1Score: 1, team2Score: 0 }, action), { team1Score: 1, team2Score: 0 }, 'should be equal');
    });

    it('should return a new state', () => {
        action.type = actions.CHANGE_SCORE;
        action.score = { team1Score: 1, team2Score: 0 };
        assert.deepEqual(dataOverlayReducer({ team1Score: 0, team2Score: 0 }, action), { team1Score: 1, team2Score: 0 }, 'should be equal');
    });
});
