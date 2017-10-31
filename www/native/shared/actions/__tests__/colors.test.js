import Actions from '../../constants/ActionTypes';
import { changeTheme } from '../colors';

describe('App theme/color actions', () => {
    test('Should return correct action', () => {
        expect(changeTheme().type).toEqual(Actions.CHANGE_THEME);
    });

    test('Should return correct payload', () => {
        const input = 'test data';
        expect(changeTheme(input).data).toEqual(input);
    });
});
