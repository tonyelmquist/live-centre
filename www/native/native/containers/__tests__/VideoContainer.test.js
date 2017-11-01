import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import shallow from '../../../shared/utils/enzymeSetup';
// import shallow from '../../../..//../utils/enzymeSetup';

import Video from '../VideoContainer';
import { immersiveState, appState } from '../../../shared/actions';

jest.mock('../../components/VideoPlayer', () => 'Video');
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

    test.skip('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('render container', () => {
        expect(wrapper.prop('isImmersive')).toEqual(initialState.device.isImmersive);
        expect(wrapper.prop('orientation')).toEqual(initialState.device.orientation);
        expect(wrapper.prop('dimensions')).toEqual(initialState.device.dimensions);
        expect(wrapper.prop('appState')).toEqual(initialState.device.appState);

        // expect(wrapper.prop('isImmersive')).toEqual(true);
    });

    test.skip('functions correctly', () => {
        const testRenderer = renderer.create(<Video store={store} uri={'some uri'} />);
        expect(testRenderer.toJSON()).toMatchSnapshot('rtr');
        store.dispatch(immersiveState(true));
        store.dispatch(appState('background'));
        testRenderer.update(<Video store={store} uri={'some uri'} />);
        const testInstance = testRenderer.getInstance();
        expect(wrapper).toMatchSnapshot('updated');
        console.log(testInstance.props.store.getState('isImmersive'));
    });
});
