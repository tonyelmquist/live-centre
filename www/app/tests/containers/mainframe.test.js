import {enzymeMount, expect, store} from '../tests.helper.js';
import MainFrame from '../../scripts/containers/MainFrame';
import {changeNavMenuIndex} from '../../scripts/actions/bottomNavMenu';
import sinon from 'sinon';

const numberOfViews = 3;

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

    it('has language buttons', ()=> {
        const btn = wrapper.find('RaisedButton');
        expect(btn.length).to.equal(2);
    });

    it('should change the language onTouchTap', ()=> {
        wrapper.find('#btn_nor').prop('onTouchTap')();
        expect(wrapper.find('MainFrame').props().lang).to.equal("nb");
        wrapper.find('#btn_eng').prop('onTouchTap')();
        expect(wrapper.find('MainFrame').props().lang).to.equal("en");
    });

    it('should change views', ()=> {
        const views = wrapper.find('MainFrame');
        store.dispatch(changeNavMenuIndex(1));
        expect(views.props().selectedIndex).to.be.equal(1);
    });

});
