import {enzymeMount, enzymeMountWithRouter, expect} from '../tests.helper.js';
import SearchBar from '../../scripts/components/navigation/SearchBar';

describe('SearchBar', () => {

  const props = {
	searchState: {},
	handleSearch: function(){},
	openCloseSearch: function(){}
  };

  let wrapper;

  it('renders an Icon Button', () => {
    wrapper = enzymeMountWithRouter(SearchBar, props);
    expect(wrapper.find('IconButton').exists()).to.be.true;
  });

    it('renders a MediaQuery', () => {
    wrapper = enzymeMountWithRouter(SearchBar, props);
    expect(wrapper.find('MediaQuery').exists()).to.be.true;
  });

})