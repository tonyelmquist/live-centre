import { enzymeMount, expect } from '../tests.helper.js';
import FavoritePage from '../../scripts/containers/pages/FavoritePage';

describe('FavoritePage', () => {
    const props = {

    };

    let wrapper;

    it('renders the FavoritePage', () => {
        wrapper = enzymeMount(FavoritePage, props);
        expect(wrapper.find('.slide').exists()).to.be.true;
    });
});
