import { enzymeMount, expect } from '../tests.helper.js';
import FormList from '../../scripts/components/form/FormList';

describe('FormList', () => {
    const props = {

    };

    let wrapper;

    it('renders the form list', () => {
        wrapper = enzymeMount(FormList, props);
        expect(wrapper.find('.formList').exists()).to.be.true;
    });
});
