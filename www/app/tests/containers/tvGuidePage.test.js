import {enzymeMount, expect} from '../tests.helper.js';
import TVGuidePage from '../../scripts/containers/pages/TVGuidePage';

describe('TVGuidePage', () => {

  const props = {

  };

  let wrapper;

  it('renders the TVGuidePage', () => {
    wrapper = enzymeMount(TVGuidePage, props);
    expect(wrapper.find('div').exists()).to.be.true;
  });

})