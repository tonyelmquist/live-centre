// import sinon from 'sinon';
import { enzymeMountWithRouter, expect } from '../tests.helper';
import HeaderMenu from '../../scripts/components/navigation/HeaderMenu';

describe('HeaderMenu', () => {
    const props = {
        pageItems: [],
        categoryItems: [],
        openCloseMenu() {},
        isMenuOpen() {},
        locationName: '',
        isSubPage: true,
        changeRoute() {},
        searchState: {},
        handleSearch() {},
        openCloseSearch() {},
    };

    let wrapper;


    it('renders the HeaderMenu', () => {
        wrapper = enzymeMountWithRouter(HeaderMenu, props);
        expect(wrapper.find('.header').exists()).to.be.true;
    });

    it('renders a MediaQuery', () => {
        wrapper = enzymeMountWithRouter(HeaderMenu, props);
        expect(wrapper.find('MediaQuery').exists()).to.be.true;
    });
});
