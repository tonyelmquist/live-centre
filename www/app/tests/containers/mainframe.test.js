'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {enzymeMount, expect} from '../tests.helper.js';
import MainFrame from '../../scripts/containers/MainFrame';
import sinon from 'sinon';

describe('MainFrame',() => {
    let wrapper;

    it('renders MainFrame', ()=> {
        sinon.spy(MainFrame.prototype, 'render');
        wrapper = enzymeMount(MainFrame);
        expect(MainFrame.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('MainFrame').exists()).to.be.true;
        // console.log(wrapper.debug());
    });

    it('has a swipeable views', ()=> {
        const views = wrapper.find('SwipeableViews');
        expect(views.length).to.equal(1);
    });

    it('has language buttons', ()=> {
        const btn = wrapper.find('RaisedButton');
        expect(btn.length).to.equal(2);
    });

    it('should change the language onTouchTap', ()=> {
        wrapper.find('#btn_nor').prop('onTouchTap')();
        expect(wrapper.find('MainFrame').props().lang).to.equal("nb");
        wrapper.find('#btn_eng').prop('onTouchTap')();
        expect(wrapper.find('MainFrame').props().lang).to.equal("en");
    });

});
