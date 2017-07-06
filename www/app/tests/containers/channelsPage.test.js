import { enzymeMount, expect } from '../tests.helper.js';
import ChannelsPage from '../../scripts/containers/pages/ChannelsPage';

describe('ChannelsPage', () => {
    const props = {

    };

    let wrapper;

    it('renders the ChannelsPage', () => {
        wrapper = enzymeMount(ChannelsPage, props);
        expect(wrapper.find('h1').exists()).to.be.true;
    });
});
