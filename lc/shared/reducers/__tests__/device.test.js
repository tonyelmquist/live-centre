import deviceReducer from '../device';
import types from '../../constants/ActionTypes';

jest.mock('Dimensions', () => ({
    width: 1024,
    height: 1920,
    get() {
        return this;
    }
}));

describe('Device reducer test', () => {
    test('Handles actions correctly', () => {
        const base = {
            isConnected: null,
            isImmersive: false,
            isStatusBarHidden: false,
            dimensions: { height: 1920, screenHeight: 1920, screenWidth: 1024, width: 1024 },
            orientation: 'PORTRAIT',
            appState: 'active'
        };

        // Orientation handling
        expect(deviceReducer(base, { type: types.ORIENTATION_CHANGE, data: 'LANDSCAPE' })).toEqual(
            Object.assign({}, base, { orientation: 'LANDSCAPE' })
        );

        // Connection state handling
        expect(deviceReducer(base, { type: types.CONNECTION_STATUS_CHANGE, data: true })).toEqual(
            Object.assign({}, base, { isConnected: true })
        );

        // Application state handling
        expect(deviceReducer(base, { type: types.APP_STATE_CHANGE, data: 'background' })).toEqual(
            Object.assign({}, base, { appState: 'background' })
        );

        // Dimensions state handling
        expect(
            deviceReducer(Object.assign({}, base, { dimensions: {} }), {
                type: types.DIMENSIONS_CHANGE
            })
        ).toEqual(base);

        // Status bar state handling
        expect(deviceReducer(base, { type: types.STATUSBAR_STATE_CHANGE, data: true })).toEqual(
            Object.assign({}, base, { isStatusBarHidden: true })
        );

        // Immersive mode handling
        expect(deviceReducer(base, { type: types.IMMERSIVE_MODE_CHANGE, data: true })).toEqual(
            Object.assign({}, base, { isImmersive: true })
        );
    });
});
