import {assert, expect} from 'chai';
import loginReducer from '../../scripts/reducers/loginReducer';
import actions from '../../scripts/constants/reduxConstants';


describe("Login Reducer",() => {
    const action = {};

    it('should return a boolean',() => {
        assert.typeOf(loginReducer(undefined, action), 'boolean', 'return value is a boolean');
    });

    it('should return initial state',() => {
        assert.equal(loginReducer(undefined, action), false, 'return false if state is undefined');
        assert.equal(loginReducer(true, action), true, 'return state if it is defined');
    });

    it('should handle login state',() => {
        action.type = actions.LOGIN_SUCCESS;
        assert.equal(loginReducer(false, action), true, 'return true if login was successful');
        action.type = actions.LOGOUT_SUCCESS;
        assert.equal(loginReducer(false, action), false, 'return false if logout was successful');
    });

});
