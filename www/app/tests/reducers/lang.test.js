import {assert, expect} from 'chai';
import langReducer from '../../scripts/reducers/langReducer';
import actions from '../../scripts/constants/reduxConstants';


describe("Language Reducer",() => {
    const action = {};

    it('should return a string',() => {
        assert.typeOf(langReducer(undefined, action), 'string', 'return value is a string');
        assert.lengthOf(langReducer(undefined, action), 2, 'return value has a length of 2');
    });

    it('should return the initial state', ()=> {
        assert.equal(langReducer(undefined, action), "en", 'should be equal');

        action.type = "DEFAULT";
        assert.equal(langReducer("ru", action), "ru", 'should be equal');
    });

    it('should return a new state', ()=> {
        action.type = actions.CHANGE_LANG;
        action.lang = "no";
        assert.equal(langReducer("en", action), "no", 'should be equal');

    });

});
