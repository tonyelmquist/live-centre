import {assert, expect} from 'chai';
import dataOverlayReducer from '../../scripts/reducers/dataOverlayReducer';
import actions from '../../scripts/constants/reduxConstants';


describe("Data Overlay Reducer",() => {
    const action = {};

    it('should return the initial state', ()=> {
        assert.equal(dataOverlayReducer(undefined, action), '', 'should be equal');
        action.type = "DEFAULT";
        assert.equal(dataOverlayReducer("45", action), '45', 'should be equal');
    });

    it('should return a new state', ()=> {
        action.type = actions.CHANGE_SCORE;
        action.score = '32';
        assert.equal(dataOverlayReducer('32', action), '32', 'should be equal');

    });

});
