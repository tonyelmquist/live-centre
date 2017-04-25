import {assert, expect} from 'chai';
import videosReducer from '../../scripts/reducers/videosReducer';
import actions from '../../scripts/constants/reduxConstants';

const action = {};

describe("Video Reducer",() => {
    it('should return the initial state', ()=> {

        assert.deepEqual(videosReducer(undefined, action), {isFetching: false, items:[]}, 'should be equal');

        // FETCH_METADATA_FAILED
        action.type = actions.FETCH_METADATA_FAILED;
        assert.deepEqual(videosReducer(undefined, action), {isFetching: false, items:[]}, 'should be equal');
    });

    it('should return a new state', ()=> {
        // FETCH_METADATA_SENT
        action.type = actions.FETCH_METADATA_SENT;
        assert.deepEqual(videosReducer(undefined, action), {isFetching: true, items:[]}, 'should be equal');

        // FETCH_METADATA_SUCCESS
        action.type = actions.FETCH_METADATA_SUCCESS;
        action.items = ['OK'];
        assert.deepEqual(videosReducer(undefined, action), {isFetching: false, items:['OK']}, 'should be equal');
    });

});
