import { enzymeMount, expect } from '../tests.helper';
import Poster from '../../scripts/components/common/Poster';

describe('Poster', () => {
    let wrapper;

    const props = {
        handlePlay() {},
        imageUrl: 'www.google.com/image.jpg',
    };

    it('renders Poster', () => {
        wrapper = enzymeMount(Poster, props);
        expect(wrapper.find('.poster').exists()).to.be.true;
    });

    it('renders an image', () => {
        wrapper = enzymeMount(Poster, props);
        expect(wrapper.find('img').exists()).to.be.true;
    });
});
