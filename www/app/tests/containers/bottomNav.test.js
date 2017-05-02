'use strict';
import React from 'react';
import {enzymeMount, expect} from '../tests.helper.js';
import BottomNavMenu from '../../scripts/containers/BottomNav';
import sinon from 'sinon';

describe('BottomNavMenu',() => {
    let wrapper;

    it('renders BottomNavMenu', ()=> {
        sinon.spy(BottomNavMenu.prototype, 'render');
        wrapper = enzymeMount(BottomNavMenu);
        expect(BottomNavMenu.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('BottomNavMenu').exists()).to.be.true;
        // console.log(wrapper.debug());
    });

    it('renders navigation panel', ()=> {
        expect(wrapper.find('BottomNavigation').exists()).to.be.true;
    });

    it('renders several navigation items', ()=> {
        expect(wrapper.find('BottomNavigationItem').length).above(0);
    });

});
