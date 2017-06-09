import {enzymeMount, expect, store} from '../tests.helper.js';
import HomeGrid from '../../scripts/containers/Grid';
import sinon from 'sinon';
//Video List initialization
import initVideoList from '../../scripts/utils/initVideos';

const promise = initVideoList(store);
describe('HomeGrid',() => {
    let wrapper;

    it('calls render', ()=> {
        sinon.spy(HomeGrid.prototype, 'render');
        wrapper = enzymeMount(HomeGrid);
        expect(HomeGrid.prototype.render.calledOnce).to.equal(true);
    });

    it('creates HomeGrid', ()=> {
        wrapper = enzymeMount(HomeGrid);
        expect(wrapper.find('HomeGrid').exists()).to.be.true;
    });
});
