import 'react-native';
import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ScrollItem from '../ScrollItem';

configure({ adapter: new Adapter() });
const title = 'Sample title';
const mockFunc = jest.fn();

describe('Tests ScrollItem component', () => {
    test('renders correctly', () => {
        const wrapper = shallow(<ScrollItem uri={''} handlePress={mockFunc} title={title} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.props().style).toMatchObject({
            height: 180,
            width: 250
        });
        expect(
            wrapper
                .find('[data-jest="title"]')
                .children()
                .text()
        ).toBe(title);
    });

    test('calls handlePress on touch', () => {
        const wrapper = shallow(<ScrollItem uri={''} handlePress={mockFunc} title={title} />);
        wrapper.find('TouchableOpacity').simulate('press');
        // wrapper
        //     .find('TouchableOpacity')
        //     .props()
        //     .onPress();
        expect(mockFunc).toHaveBeenCalledTimes(1);
    });
});
