import { enzymeMount, expect } from '../tests.helper.js';
import TabMenu from '../../scripts/components/navigation/TabMenu';

describe('TabMenu', () => {
    const props = {
        pageItems: [{ icon: {}, key: 'route_home', path: '/Home' }],
        changeRoute() {},
        openCloseMenu() {},
        isMenuOpen() {},
        isSubPage: true,
    };

    let wrapper;

    // it('renders a tab menu', () => {
    //     wrapper = enzymeMount(TabMenu, props);
    //     console.log(wrapper);
    //     expect(wrapper.find('.bottomTabs').exists()).to.be.true;
    // });
    // Only renders when max width is below 1000, commented out for now
});
