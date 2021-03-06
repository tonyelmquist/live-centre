import { enzymeMount, expect } from '../tests.helper';
import AnimatedMenuIcon from '../../scripts/components/animatedIcons/AnimatedMenuIcon';
// import sinon from 'sinon';

describe('AnimatedMenuIcon', () => {
    const props = {
        isMenuOpen() { return true; },
    };

    let wrapper;

    it('renders AnimatedMenuIcon', () => {
        wrapper = enzymeMount(AnimatedMenuIcon, props);
        expect(wrapper.find('AnimatedMenuIcon').exists()).to.be.true;
    });
});
