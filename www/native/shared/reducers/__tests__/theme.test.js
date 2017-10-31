import theme from '../theme';
import types from '../../constants/ActionTypes';

import { getThemeByName } from '../../constants/Themes';

describe('Theme reducer test', () => {
    test('Handles actions correctly', () => {
        const initialState = getThemeByName();
        const expected = { theme: 'new theme' };
        expect(theme({}, { type: types.CHANGE_THEME, data: expected })).toEqual(expected);
        expect(theme(undefined, { type: 'IRRELEVANT_TYPE' })).toEqual(initialState);
    });
});
