import {enzymeMount, expect, store} from '../tests.helper.js';
import SettingsPage from '../../scripts/containers/pages/SettingsPage';
import sinon from 'sinon';

describe('Settings', () => {

    const props = {
        settings: {options: {'foo': 'bar'}}
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

    it('has language buttons', () => {
        wrapper = enzymeMount(SettingsPage, props);
        const btn = wrapper.find('<MenuItem>');
        expect(btn.length)
            .to
            .be.greaterThan(0);
    });

});
