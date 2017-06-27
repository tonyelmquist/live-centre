import {enzymeMount, enzymeMountWithRouter, expect} from '../tests.helper.js';
import HeaderMenu from '../../scripts/components/navigation/HeaderMenu';

describe('HeaderMenu', () => {

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
    wrapper = enzymeMountWithRouter(HeaderMenu, props);
    expect(wrapper.find('.header').exists()).to.be.true;
  });

    it('renders a MediaQuery', () => {
    wrapper = enzymeMountWithRouter(HeaderMenu, props);
    expect(wrapper.find('MediaQuery').exists()).to.be.true;
  });

})