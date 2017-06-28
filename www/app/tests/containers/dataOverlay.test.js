import sinon from 'sinon';
import { enzymeMount, expect } from '../tests.helper';
import DataOverlay from '../../scripts/containers/DataOverlay';


describe('DataOverlay', () => {
    let wrapper;

    it('renders DataOverlay', () => {
        sinon.spy(DataOverlay.prototype, 'render');
        wrapper = enzymeMount(DataOverlay);
        expect(DataOverlay.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('DataOverlay').exists()).to.be.true;
    });
});
