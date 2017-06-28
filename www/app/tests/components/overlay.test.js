import { enzymeMount, expect } from '../tests.helper.js';
import Overlay from '../../scripts/components/common/Overlay';

describe('Overlay', () => {
    const props = {
        handleClose() {},
    };

    let wrapper;

    it('renders a Overlay', () => {
        wrapper = enzymeMount(Overlay, props);
        expect(wrapper.find('.fs-overlay').exists()).to.be.true;
    });

    it('renders an Icon Button', () => {
        wrapper = enzymeMount(Overlay, props);
        expect(wrapper.find('IconButton').exists()).to.be.true;
    });
});
