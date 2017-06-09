import {enzymeMount, expect} from '../tests.helper.js';
import MasonryTiles from '../../scripts/components/common/MasonryTiles';

describe('MasonryTile', () => {

    const props = {
        videos: [],
        filter: ''
    };

    let wrapper;

    it('renders a MasonryTile', () => {
        wrapper = enzymeMount(MasonryTiles, props);
        expect(wrapper.find('.masonry_tiles').exists()).to.be.true;
    });

})