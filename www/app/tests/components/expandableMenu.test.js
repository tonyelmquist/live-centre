import { enzymeMount, expect } from '../tests.helper.js';
import ExpandableMenu from '../../scripts/components/navigation/ExpandableMenu';
import sinon from 'sinon';

describe('ExpandableMenu', () => {
    const props = {
        pageItems: [],
        categoryItems: [],
        openCloseMenu() {},
        isMenuOpen() {},
        changeRoute() {},
    };

    let wrapper;


    it('renders MediaQuery', () => {
        wrapper = enzymeMount(ExpandableMenu, props);
        expect(wrapper.find('MediaQuery').exists()).to.be.true;
    });
});
