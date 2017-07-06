import { assert } from 'chai';
import chatReducer from '../../scripts/reducers/chatReducer';
import actions from '../../scripts/constants/reduxConstants';


describe('Data Overlay Reducer', () => {
    const action = {};

    it('should return the initial state', () => {
        assert.deepEqual(chatReducer(undefined, action), { chatOpen: false, messages: [] }, 'should be equal');
    });

    it('should add a message on GET_MESSAGE', () => {
        action.type = actions.GET_MESSAGE;
        action.id = 1;
        action.user = 'test';
        action.message = 'testMessage';
        assert.deepEqual(chatReducer(undefined, action), { chatOpen: false, messages: [{ id: 1, user: 'test', message: 'testMessage' }] }, 'should be equal');
    });

    it('should toggle chat menu', () => {
        action.type = actions.TOGGLE_CHAT_MENU;
        assert.deepEqual(chatReducer(undefined, action), { chatOpen: true, messages: [] }, 'should be equal');
    });

    it('should toggle chat menu', () => {
        action.type = actions.TOGGLE_CHAT_MENU;
        assert.deepEqual(chatReducer(undefined, action), { chatOpen: true, messages: [] }, 'should be equal');
    });

    it('should clear messages', () => {
        action.type = actions.CLEAR_MESSAGES;
        assert.deepEqual(chatReducer({ chatOpen: false, messages: [{ id: 1, user: 'test', message: 'testMessage' }] }, action), { chatOpen: false, messages: [] }, 'should be equal');
    });
});
