import {enzymeMount, expect, store} from '../tests.helper.js';
import Item from '../../scripts/components/Item';
import sinon from 'sinon';

describe('Item', () => {

    const props = {
        video: {
            title: '',
            thumbnail: '',
            author: '',
            company: '',
            category: '',
            email: '',
            assetid: ''
        }
    };

    let wrapper;

    it('renders Item', () => {
        sinon.spy(Item.prototype, 'render');
        wrapper = enzymeMount(Item, props);
        expect(Item.prototype.render.calledOnce)
            .to
            .equal(true);
        expect(wrapper.find('Item').exists()).to.be.true;
    });

})