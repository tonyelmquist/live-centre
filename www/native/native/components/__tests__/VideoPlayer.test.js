import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from '../VideoPlayer';

// require('react-native-mock/mock');

configure({ adapter: new Adapter() });

const defaultState = {
    loading: false,
    duration: 0.0,
    currentTime: 0.0,
    paused: false
};
const videoData = {
    duration: 100,
    currentTime: 10
};

const fullScreenFnMock = jest.fn();
const uri = 'video uri';
jest.mock('Animated', () => {
    const ActualAnimated = require.requireActual('Animated');
    return {
        ...ActualAnimated,
        timing: (value, config) => ({
            start: (callback) => {
                value.setValue(config.toValue);
                callback && callback();
            }
        })
    };
});

const wrapper = shallow(<VideoPlayer uri={uri} handleFullScreen={fullScreenFnMock} />);

describe('Video Player tests', () => {
    test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('initializes state correctly', () => {
        expect(wrapper.state('loading')).toBe(defaultState.loading);
        expect(wrapper.state('duration')).toBe(defaultState.duration);
        expect(wrapper.state('currentTime')).toBe(defaultState.currentTime);
        expect(wrapper.state('paused')).toBe(defaultState.paused);
    });

    test('loads video correctly', () => {
        // Load start
        wrapper.find('Video').prop('onLoadStart')();
        expect(wrapper.state('loading')).toBe(true);
        // Video loaded
        wrapper.find('Video').prop('onLoad')(videoData);
        expect(wrapper.state('loading')).toBe(false);
        expect(wrapper.state('duration')).toBe(videoData.duration);
        // console.log(wrapper.state('duration'));
        wrapper.find('Video').prop('onProgress')(videoData);
        expect(wrapper.state('currentTime')).toBe(videoData.currentTime);
    });
});
