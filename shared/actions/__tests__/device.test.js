import Actions from '../../constants/ActionTypes';
import {
    connectionState,
    orientationState,
    immersiveState,
    statusBarState,
    dimensions,
    appState
} from '../device';

describe('Device actions', () => {
    test('Should return correct action', () => {
        expect(connectionState().type).toEqual(Actions.CONNECTION_STATUS_CHANGE);
        expect(orientationState().type).toEqual(Actions.ORIENTATION_CHANGE);
        expect(immersiveState().type).toEqual(Actions.IMMERSIVE_MODE_CHANGE);
        expect(statusBarState().type).toEqual(Actions.STATUSBAR_STATE_CHANGE);
        expect(dimensions().type).toEqual(Actions.DIMENSIONS_CHANGE);
        expect(appState().type).toEqual(Actions.APP_STATE_CHANGE);
    });

    test('Should return correct payload', () => {
        const input = 'test data';
        expect(connectionState(input).data).toEqual(input);
        expect(orientationState(input).data).toEqual(input);
        expect(immersiveState(input).data).toEqual(input);
        expect(statusBarState(input).data).toEqual(input);
        expect(appState(input).data).toEqual(input);
    });

    test('Should return only action type', () => {
        const input = 'test data';
        const expected = { type: Actions.DIMENSIONS_CHANGE };
        const result = dimensions(input);
        expect(Object.keys(result)).toHaveLength(1);
        expect(result).toMatchObject(expected);
    });
});
