// import sinon from 'sinon';
import { enzymeMount, expect } from '../tests.helper';
import CategoryItem from '../../scripts/components/CategoryItem';


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
