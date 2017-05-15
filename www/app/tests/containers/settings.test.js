import {enzymeMount, expect, store} from '../tests.helper.js';
import Settings from '../../scripts/containers/pages/SettingsPage';
import sinon from 'sinon';

describe('Settings',() => {
    let wrapper;

    it('renders Settings', ()=> {
        sinon.spy(Settings.prototype, 'render');
        wrapper = enzymeMount(Settings);
        expect(Settings.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('SettingsPage').exists()).to.be.true;
    });

    it('has language buttons', ()=> {
        const btn = wrapper.find('RaisedButton');
        expect(btn.length).to.equal(2);
    });

});
