import React from 'react';
import {enzymeMount, expect, store, } from '../tests.helper.js';
import {shallow} from 'enzyme';
import SettingsPage from '../../scripts/containers/pages/SettingsPage';
import Settings from '../../scripts/classes/settings';
import sinon from 'sinon';

describe('Settings', () => {

    const testSettingsEnglish = new Settings({
        language:'en',
        subtitleLanguage:'en',
        audioLanguage:'en',
        recommendations:false
    });

    const props = {
        settings: {options: testSettingsEnglish, saving: false }
    };

    let wrapper;

    it('renders SettingsPage', () => {
        sinon.spy(SettingsPage.prototype, 'render');
        wrapper = enzymeMount(SettingsPage, props);
        expect(SettingsPage.prototype.render.calledOnce)
            .to
            .equal(true);
        expect(wrapper.find('SettingsPage').exists()).to.be.true;
    });

    it('has title in English', () => {
        wrapper = enzymeMount(SettingsPage, props);
        const title = wrapper.find('h1');
        expect(title.text())
            .to.equal("Settings");
    });

    it('has dropdowns', () => {
        wrapper = enzymeMount(SettingsPage, props);
        const selectField = wrapper.find('SelectField');
        expect(selectField.length)
            .to
            .be.greaterThan(0);
    });

});
