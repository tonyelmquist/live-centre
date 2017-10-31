import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaybackTime from '../PlaybackTime';

configure({ adapter: new Adapter() });
const duration = 121;
const currentTime = 10;

describe('Tests PlaybackTime component', () => {
    test('renders correctly', () => {
        const component = shallow(<PlaybackTime duration={duration} currentTime={currentTime} />);
        expect(component).toMatchSnapshot();
        const currentTimeValue = component
            .find(testSelector('currentTime'))
            .childAt(0)
            .text();
        const durationValue = component
            .find(testSelector('duration'))
            .childAt(0)
            .text();
        expect(currentTimeValue).toBe(`0:${currentTime}`);
        expect(durationValue).toBe(
            `${Math.floor(duration / 60)}:${duration % 60 < 10 ? '0' : ''}${duration % 60}`
        );
    });

    test.skip('calls lifecycle method', () => {
        const testRenderer = renderer.create(
            <PlaybackTime duration={duration} currentTime={currentTime} />
        );

        testRenderer.update(<PlaybackTime duration={duration + 1} currentTime={currentTime} />);
        // console.log(testRenderer.toJSON());
    });
});

function testSelector(value) {
    return `[data-test='${value}']`;
}
