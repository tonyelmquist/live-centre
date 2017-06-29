import {enzymeMount, expect} from '../tests.helper.js';
import TabMenu from '../../scripts/components/navigation/TabMenu';

describe('TabMenu', () => {

  const props = {
    pageItems: [{icon: {}, key: 'route_home', path: '/Home'}],
    changeRoute: function () {},
    openCloseMenu: function () {},
    isMenuOpen: function () {},
    isSubPage: true
  };

  let wrapper;

  it('renders a tab menu', () => {
    wrapper = enzymeMount(TabMenu, props);
    expect(wrapper.find('.bottomTabs').exists()).to.be.true;
  });

})