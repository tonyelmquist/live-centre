import {enzymeMount, expect} from '../tests.helper.js';
import HeaderMenu from '../../scripts/components/header/HeaderMenu';

describe('ExpandableMenu', () => {

  const props = {
    pageItems : [],
    categoryItems : [],
	openCloseMenu: function(){},
	isMenuOpen: function(){},
	locationName: '',
	isSubPage: true,
	changeRoute: function(){},
	searchState: {},
	handleSearch: function(){},
	openCloseSearch: function(){}
  };

  let wrapper;


  it('renders the HeaderMenu', () => {
    wrapper = enzymeMount(HeaderMenu, props);
    expect(wrapper.find('.header').exists()).to.be.true;
  });

    it('renders a MediaQuery', () => {
    wrapper = enzymeMount(HeaderMenu, props);
    expect(wrapper.find('MediaQuery').exists()).to.be.true;
  });

})