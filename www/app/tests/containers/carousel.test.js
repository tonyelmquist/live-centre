import sinon from 'sinon';
import { enzymeMount, expect } from '../tests.helper';
import HeroCarousel from '../../scripts/containers/Carousel';


describe('HeroCarousel', () => {
    let wrapper;

    it('renders HeroCarousel', () => {
        sinon.spy(HeroCarousel.prototype, 'render');
        wrapper = enzymeMount(HeroCarousel);
        expect(HeroCarousel.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('HeroCarousel').exists()).to.be.true;
    });
});
