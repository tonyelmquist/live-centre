import Actions from '../../constants/ActionTypes';
import { categoryUpdateSuccess, categoryUpdateFailed } from '../categoryUpdate';

describe('Video category actions', () => {
    test('Should return correct action', () => {
        expect(categoryUpdateSuccess().type).toEqual(Actions.CATEGORIES_UPDATE_SUCCESS);
        expect(categoryUpdateFailed().type).toEqual(Actions.CATEGORIES_UPDATE_FAILED);
    });

    test('Should return correct payload', () => {
        const input = 'test data';
        expect(categoryUpdateSuccess(input).data).toEqual(input);
        expect(categoryUpdateFailed(input).data).toBeUndefined();
    });
});
