import {enzymeMount, expect, store} from '../tests.helper.js';
import CategoryRow from '../../scripts/components/CategoryRow';
import sinon from 'sinon';

describe('CategoryRow',() => {
    let wrapper;

    it('renders CategoryRow', ()=> {
        sinon.spy(CategoryRow.prototype, 'render');
        wrapper = enzymeMount(CategoryRow);
        expect(CategoryRow.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('CategoryRow').exists()).to.be.true;
    })

});