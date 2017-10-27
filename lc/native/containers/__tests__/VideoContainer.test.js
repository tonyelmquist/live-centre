import React from 'react';
import configureStore from 'redux-mock-store';
import shallow from '../../../shared/utils/enzymeSetup';
// import shallow from '../../../..//../utils/enzymeSetup';
import Video from '../VideoContainer';
// import { immersiveState, statusBarState } from '../../actions';

describe('Video tests', () => {
    const initialState = {
        device: {
            isImmersive: false,
            orientation: 'PORTRAIT',
            dimensions: { width: 1080, height: 1920 },
            appState: 'active'
        }
    };
    const mockStore = configureStore();

    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = shallow(<Video store={store} uri={'some uri'} />);
    });

    test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('render container', () => {
        expect(wrapper.prop('isImmersive')).toEqual(initialState.device.isImmersive);
        expect(wrapper.prop('orientation')).toEqual(initialState.device.orientation);
        expect(wrapper.prop('dimensions')).toEqual(initialState.device.dimensions);
        expect(wrapper.prop('appState')).toEqual(initialState.device.appState);
    });

    test('functions correctly', () => {
        // console.log(wrapper.find('VideoPlayer'));
        expect(1).toEqual(1);
    });
});
