import React from 'react';
import configureStore from 'redux-mock-store';
import shallow from '../../../shared/utils/enzymeSetup';
import Header from '../Header';

describe('Header container tests', () => {
    const initialState = {
        colors: { DEFAULT: 'red' }
    };
    const mockStore = configureStore();

    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = shallow(<Header store={store} />);
    });
    test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('render container', () => {
        expect(wrapper.prop('colors')).toEqual(initialState.colors);
    });
});
