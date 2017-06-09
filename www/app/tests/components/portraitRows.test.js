import {enzymeMount, expect} from '../tests.helper.js';
import PortraitRows from '../../scripts/components/common/PortraitRows';
import sinon from 'sinon';

describe('PortraitRows', () => {

  const props = {
    people: [
      {
        username: 'tom',
        uid: 'tom',
        img: 'tom.jpg'
      }, {
        username: 'jerry',
        uid: 'jerry',
        img: 'jerry.jpg'
      }
    ]
  };

  let wrapper;

  it('calls the render function', () => {
    sinon.spy(PortraitRows.prototype, 'render');
    wrapper = enzymeMount(PortraitRows, props);
    expect(PortraitRows.prototype.render.calledOnce)
      .to
      .equal(true);
  });

  it('renders PortraitRows', () => {
    wrapper = enzymeMount(PortraitRows, props);
    expect(wrapper.find('.horizontalScroll').exists()).to.be.true;
  });

  it('renders an Avatar', () => {
    wrapper = enzymeMount(PortraitRows, props);
    expect(wrapper.find('Avatar').exists()).to.be.true;
  });

})