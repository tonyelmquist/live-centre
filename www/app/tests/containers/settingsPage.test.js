import {enzymeMount, expect} from '../tests.helper.js';
import SettingsPage from '../../scripts/containers/pages/SettingsPage';

describe('SettingsPage', () => {

  const props = {

  };

  let wrapper;

  it('renders the SettingsPage', () => {
    wrapper = enzymeMount(SettingsPage, props);
    expect(wrapper.find('.settings-page').exists()).to.be.true;
  });

})