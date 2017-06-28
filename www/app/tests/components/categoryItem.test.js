import { enzymeMount, expect } from '../tests.helper.js';
import CategoryItem from '../../scripts/components/CategoryItem';
import sinon from 'sinon';

describe('CategoryItem', () => {
    let wrapper;

    const props = {
        dispatch() {},
        video: {},
        handleClick() {},
    };

    it('renders CategoryItem', () => {
        wrapper = enzymeMount(CategoryItem, props);
        expect(wrapper.find('.videoThumb').exists()).to.be.true;
    });
});
