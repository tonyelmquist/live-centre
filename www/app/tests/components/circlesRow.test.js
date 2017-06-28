import sinon from 'sinon';
import { enzymeMount, enzymeMountWithRouter, expect } from '../tests.helper';
import CirclesRow from '../../scripts/components/common/CirclesRow';

describe('CirclesRow', () => {
    let wrapper;

    const props = {
    };

    it('calls the render function', () => {
        sinon.spy(CirclesRow.prototype, 'render');
        wrapper = enzymeMount(CirclesRow, props);
        expect(CirclesRow.prototype.render.calledOnce)
            .to
            .equal(true);
    });

    it('renders CirclesRow', () => {
        wrapper = enzymeMountWithRouter(CirclesRow, props);
        expect(wrapper.find('.horizontalScroll').exists()).to.be.true;
    });
});
