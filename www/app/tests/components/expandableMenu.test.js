import {enzymeMount, expect} from '../tests.helper.js';
import ExpandableMenu from '../../scripts/components/header/ExpandableMenu';
import sinon from 'sinon';

describe('ExpandableMenu', () => {

  const props = {
    pageItems: [],
    categoryItems: [],
    openCloseMenu: function(){},
	isMenuOpen: function(){},
	changeRoute: function(){}
  };

  let wrapper;



  it('renders MediaQuery', () => {
    wrapper = enzymeMount(ExpandableMenu, props);
    expect(wrapper.find('MediaQuery').exists()).to.be.true;
  });

})