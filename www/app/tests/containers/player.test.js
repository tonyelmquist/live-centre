'use strict';
import React from 'react';
import {enzymeMount, expect} from '../tests.helper.js';
import Player from '../../scripts/containers/Player';
import sinon from 'sinon';

describe('Player',() => {
    let wrapper;

    it('renders Player', ()=> {
        sinon.spy(Player.prototype, 'render');
        wrapper = enzymeMount(Player);
        expect(Player.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('Player').exists()).to.be.true;
    });

    it('renders ReactPlayer', ()=> {
        expect(wrapper.find('ReactPlayer').exists()).to.be.true;
    });

});
