import { enzymeMount, expect } from '../tests.helper.js';
import HomePage from '../../scripts/containers/pages/HomePage';

describe('HomePage', () => {
    const props = {

    };

    let wrapper;

    it('renders the HomePage', () => {
        wrapper = enzymeMount(HomePage, props);
        expect(wrapper.find('div').exists()).to.be.true;
    });
});
