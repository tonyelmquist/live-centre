import categories from '../categories';
import types from '../../constants/ActionTypes';

describe('Categories reducer test', () => {
    test('Handles actions correctly', () => {
        const expected = { value: true };
        expect(categories({}, { type: types.CATEGORIES_UPDATE_SUCCESS, data: expected })).toEqual(
            expected
        );
        expect(categories({}, { type: types.CATEGORIES_UPDATE_FAILED, data: expected })).toEqual(
            {}
        );
        expect(categories(undefined, { type: 'IRRELEVANT_TYPE' })).toEqual({});
    });
});
