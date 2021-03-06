import sinon from 'sinon';
import { enzymeMount, expect } from '../tests.helper';
import Player from '../../scripts/containers/Player';

describe('Player', () => {
    let wrapper;

    it('renders Player', () => {
        sinon.spy(Player.prototype, 'render');
        wrapper = enzymeMount(Player);
        expect(Player.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('Player').exists()).to.be.true;
    });

    it('renders HTML5 player', () => {
        expect(wrapper.find('Video').exists()).to.be.true;
    });
});
