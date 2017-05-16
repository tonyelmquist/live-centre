import {enzymeMount, expect, store} from '../tests.helper.js';
import MainFrame from '../../scripts/containers/MainFrame';
import {changeNavMenuIndex} from '../../scripts/actions/bottomNavMenu';
import sinon from 'sinon';

const numberOfViews = 4;

describe('MainFrame',() => {
    let wrapper;

    it('renders MainFrame', ()=> {
        sinon.spy(MainFrame.prototype, 'render');
        wrapper = enzymeMount(MainFrame);
        expect(MainFrame.prototype.render.calledOnce).to.equal(true);
        expect(wrapper.find('MainFrame').exists()).to.be.true;
        // console.log(wrapper.debug());
    });

    it('renders swipeable views', ()=> {
        const swipeContainer = wrapper.find('SwipeableViews');
        expect(swipeContainer.length).to.equal(1);
        const views = wrapper.find('.react-swipeable-view-container').children();
        expect(views.length).to.equal(numberOfViews);
    });

    it('should change views', ()=> {
        const views = wrapper.find('MainFrame');
        store.dispatch(changeNavMenuIndex(1));
        expect(views.props().selectedIndex).to.be.equal(1);
    });

});
