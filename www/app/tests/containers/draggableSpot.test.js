import sinon from 'sinon';
import { enzymeMount, expect } from '../tests.helper';
import DraggableSpot from '../../scripts/containers/DraggableSpot';


describe('DraggableSpot', () => {
    let wrapper;

    it('renders DraggableSpot', () => {
        sinon.spy(DraggableSpot.prototype, 'render');
        wrapper = enzymeMount(DraggableSpot);
        expect(DraggableSpot.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('DraggableSpot').exists()).to.be.true;
    });
});
