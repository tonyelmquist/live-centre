import { enzymeMount, expect } from '../tests.helper.js';
import TabLinks from '../../scripts/components/homepage/TabLinks';

describe('TabLinks', () => {
    const props = {
        items: [],
    };

    let wrapper;

    it('renders tab links', () => {
        wrapper = enzymeMount(TabLinks, props);
        expect(wrapper.find('TabLinks').exists()).to.be.true;
    });
});
