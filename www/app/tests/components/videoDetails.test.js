import { enzymeMount, expect } from '../tests.helper';
import VideoDetails from '../../scripts/components/homepage/VideoDetails';

describe('VideoDetails', () => {
    let wrapper;

    it('renders VideoDetails', () => {
        wrapper = enzymeMount(VideoDetails);
        expect(wrapper.find('div').exists()).to.be.true;
    });
});
