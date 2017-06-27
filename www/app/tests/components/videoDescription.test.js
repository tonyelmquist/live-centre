import {enzymeMount, expect} from '../tests.helper.js';
import VideoDescription from '../../scripts/components/common/VideoDescription';

  const props = {
      
      video: { data: {title: "title"}}

  };

  let wrapper;


describe('VideoDescription', () => {
    
    it('renders VideoDescription', () => {
        wrapper = enzymeMount(VideoDescription, props);
        expect(wrapper.find('.description').exists()).to.be.true;
    });

})