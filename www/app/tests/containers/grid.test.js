import {enzymeMount, expect, store} from '../tests.helper.js';
import HomeGrid from '../../scripts/containers/Grid';
import sinon from 'sinon';
//Video List initialization
import initVideoList from '../../scripts/utils/initVideos';

const promise = initVideoList(store);
describe('HomeGrid',() => {
    let wrapper;

    it('renders HomeGrid', ()=> {
        sinon.spy(HomeGrid.prototype, 'render');
        wrapper = enzymeMount(HomeGrid);
        expect(HomeGrid.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('HomeGrid').exists()).to.be.true;
        expect(wrapper.find('HomeGrid').at(0).props().videoUrl.length).to.be.empty;
    });

    it('should render video list', (done) => {
        promise.then((data) => {
            expect(wrapper.find('HomeGrid').props().videos.length).to.equal(wrapper.find('Col').length);
            done();
        }).catch((error) => done(error) );
    });

    it('should select a video', (done) => {

        promise.then((data) => {
            const firstVideo = wrapper.find('GridTile').at(0);
            firstVideo.find('IconButton').prop('onTouchTap')();//Click on video
            expect(wrapper.find('HomeGrid').at(0).props().videoUrl.length).to.be.not.empty;
            done();
        }).catch((error) => done(error) );
    });




});
