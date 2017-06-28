import { enzymeMount, expect } from '../tests.helper.js';
import DraggableSpot from '../../scripts/containers/DraggableSpot';
import sinon from 'sinon';

describe('DraggableSpot', () => {
    let wrapper;

    it('renders DraggableSpot', () => {
        sinon.spy(DraggableSpot.prototype, 'render');
        wrapper = enzymeMount(DraggableSpot);
        expect(DraggableSpot.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('DraggableSpot').exists()).to.be.true;
    });
});
