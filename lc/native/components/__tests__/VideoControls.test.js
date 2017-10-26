import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VideoControls from '../VideoControls';

configure({ adapter: new Adapter() });

const duration = 121;
const currentTime = 10;
const handlePlayMock = jest.fn();
const onValueChangeMock = jest.fn();
const paused = false;

describe('Tests PlaybackTime component', () => {
    test('renders correctly', () => {
        const wrapper = shallow(
            <VideoControls
                duration={duration}
                currentTime={currentTime}
                handlePlay={handlePlayMock}
                onValueChange={onValueChangeMock}
                paused={paused}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('calculates and passes props correctly', () => {
        const wrapper = shallow(
            <VideoControls
                duration={duration}
                currentTime={currentTime}
                handlePlay={handlePlayMock}
                onValueChange={onValueChangeMock}
                paused={paused}
            />
        );

        expect(wrapper.find('ProgressBar').prop('progress')).toBeCloseTo(currentTime / duration, 5);
        expect(wrapper.find('PlaybackTime').prop('duration')).toBe(duration);
        expect(wrapper.find('PlaybackTime').prop('currentTime')).toBe(currentTime);
        // wrapper.find('TouchableWithoutFeedback').prop('onPress')();
        wrapper.find('TouchableWithoutFeedback').simulate('press');
        wrapper.find('ProgressBar').prop('onValueChange')();
        expect(handlePlayMock).toHaveBeenCalledTimes(1);
        expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    });
});
