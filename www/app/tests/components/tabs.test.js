import { enzymeMount, expect } from '../tests.helper';
import Tabs from '../../scripts/components/common/Tabs';

describe('Tabs', () => {
    const props = {
        active: 2,
        children: {},
    };

    let wrapper;

    it('renders Tabs', () => {
        wrapper = enzymeMount(Tabs, props);
        expect(wrapper.find('.tabs').exists()).to.be.true;
    });
});
