import { enzymeMount, expect } from '../tests.helper.js';
import Playback from '../../scripts/components/common/Playback';

describe('Playback', () => {
    const props = {
        videoUrl: '',
    };

    let wrapper;

    it('renders a Player', () => {
        wrapper = enzymeMount(Playback, props);
        expect(wrapper.find('Player').exists()).to.be.true;
    });
});
