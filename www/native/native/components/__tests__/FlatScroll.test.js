import 'react-native';
import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FlatScroll from '../FlatScroll';

configure({ adapter: new Adapter() });
test('renders correctly', () => {
    const item = {
        id: 123,
        thumbnail: 'thumbnail uri',
        title: 'item title'
    };
    const component = shallow(<FlatScroll items={[]} onItemPress={jest.fn()} />);
    expect(component).toMatchSnapshot();
    const scrollItem = component.find('FlatList').prop('renderItem')({ item });
    expect(scrollItem).toMatchSnapshot('Scroll Item');
    expect(component.prop('keyExtractor')(item)).toBe(item.id);
});
