import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProgressBar from '../ProgressBar';

configure({ adapter: new Adapter() });
test('renders correctly', () => {
    const onValueChangeMock = jest.fn();
    const progress = 0;
    const component = shallow(
        <ProgressBar onValueChange={onValueChangeMock} progress={progress} />
    );
    // component.simulate('touchStart', createStartTouchEventObject({ x: 100, y: 0 }));
    // component.simulate('touchMove', createMoveTouchEventObject({ x: 150, y: 0 }));
    // component.simulate('touchEnd', createMoveTouchEventObject({ x: 200, y: 0 }));
    expect(component).toMatchSnapshot();
    // component.find('TouchableWithoutFeedback').prop('onPress')();
    component.find('TouchableWithoutFeedback').simulate('press');
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
});
