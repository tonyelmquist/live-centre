import { enzymeMount, expect } from '../tests.helper.js';
import SeriesPage from '../../scripts/containers/pages/SeriesPage';

describe('SeriesPage', () => {
    const props = {

    };

    let wrapper;

    it('renders the SeriesPage', () => {
        wrapper = enzymeMount(SeriesPage, props);
        expect(wrapper.find('.slide').exists()).to.be.true;
    });
});
