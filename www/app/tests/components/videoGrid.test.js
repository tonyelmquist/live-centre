import sinon from 'sinon';
import { enzymeMount, expect } from '../tests.helper';
import VideoGrid from '../../scripts/components/common/VideoGrid';


describe('VideoGrid', () => {
    const props = {
        videos: [
            {
                assetid: '22',
            }, {
                assetid: '23',
            },
        ],
        onSelect() {},
    };

    let wrapper;

    it('calls the render function', () => {
        sinon.spy(VideoGrid.prototype, 'render');
        wrapper = enzymeMount(VideoGrid, props);
        expect(VideoGrid.prototype.render.calledOnce)
            .to
            .equal(true);
    });

    it('renders a Grid', () => {
        wrapper = enzymeMount(VideoGrid, props);
        expect(wrapper.find('Grid').exists()).to.be.true;
    });
});
