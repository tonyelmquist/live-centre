import {enzymeMount, expect} from '../tests.helper.js';
import DataOverlay from '../../scripts/containers/DataOverlay';
import sinon from 'sinon';

describe('DataOverlay',() => {
    let wrapper;

    it('renders DataOverlay', ()=> {
        sinon.spy(DataOverlay.prototype, 'render');
        wrapper = enzymeMount(DataOverlay);
        expect(DataOverlay.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('DataOverlay').exists()).to.be.true;
    });

    it('renders navigation panel', ()=> {
        expect(wrapper.find('BottomNavigation').exists()).to.be.true;
    });

});
