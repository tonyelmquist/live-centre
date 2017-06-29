import {enzymeMount, expect} from '../tests.helper.js';
import Episodes from '../../scripts/components/homepage/Episodes';

describe('Episodes', () => {

  const props = {

  };

  let wrapper;

  it('renders Episodes', () => {
    wrapper = enzymeMount(Episodes, props);
    expect(wrapper.find('div').exists()).to.be.true;
  });

})