import {enzymeMount, enzymeMountWithRouter, expect} from '../tests.helper.js';
import HorizontalScrollContainer from '../../scripts/components/common/HorizontalScrollContainer';
import sinon from 'sinon';


describe('HorizontalScrollContainer', () => {
    let wrapper;

    const props = {
    };

    it('calls the render function', () => {
        sinon.spy(HorizontalScrollContainer.prototype, 'render');
        wrapper = enzymeMount(HorizontalScrollContainer, props);
        expect(HorizontalScrollContainer.prototype.render.calledOnce)
            .to
            .equal(true);
    });

    it('renders HorizontalScrollContainer', () => {
        wrapper = enzymeMountWithRouter(HorizontalScrollContainer, props);
        expect(wrapper.find('.horizontalScroll').exists()).to.be.true;
    });

});
