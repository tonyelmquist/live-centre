import {enzymeMount, expect} from '../tests.helper.js';
import TabMenu from '../../scripts/components/header/TabMenu';

describe('TabMenu', () => {

  const props = {
    pageItems: [],
    changeRoute: function () {},
    openCloseMenu: function () {},
    isMenuOpen: function () {},
    isSubPage: true
  };

  let wrapper;

  it('renders a MediaQuery', () => {
    wrapper = enzymeMount(TabMenu, props);
    expect(wrapper.find('MediaQuery').exists()).to.be.true;
  });

})