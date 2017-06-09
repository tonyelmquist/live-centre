import {enzymeMount, expect} from '../tests.helper.js';
import SearchInput from '../../scripts/components/header/SearchInput';

describe('SearchInput', () => {

  const props = {
    searchState: {},
	handleSearch: function(){}
  };

  let wrapper;

  it('renders the SearchInput', () => {
    wrapper = enzymeMount(SearchInput, props);
    expect(wrapper.find('.searchInput').exists()).to.be.true;
  });

    it('renders an input', () => {
    wrapper = enzymeMount(SearchInput, props);
    expect(wrapper.find('input').exists()).to.be.true;
  });

})