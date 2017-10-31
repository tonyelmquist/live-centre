import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from '../Button';

configure({ adapter: new Adapter() });

test('renders correctly', () => {
    const handlePressMock = jest.fn();
    const wrapper = shallow(<Button handlePress={handlePressMock} title="Button" />);

    expect(wrapper).toMatchSnapshot();
    // wrapper.find('TouchableHighlight').prop('onPress')();
    wrapper.find('TouchableHighlight').simulate('press');
    expect(handlePressMock).toHaveBeenCalledTimes(1);
});
