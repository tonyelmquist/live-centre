import { enzymeMount, expect } from '../tests.helper.js';
import App from '../../scripts/containers/App';
import sinon from 'sinon';

describe('App', () => {
    let appWraper; // Enzyme react wrapper around App component

    // Function that renders app
    const renderApp = (props) => {
        if (!appWraper) {
            appWraper = enzymeMount(App, props);
        }
        return appWraper;
    };

    beforeEach(() => {
        appWraper = undefined;
    });

    it('renders App', () => {
        expect(renderApp().find('App').exists()).to.be.true;
    });

    it('calls render method once', () => {
        sinon.spy(App.prototype, 'render');
        const app = renderApp();
        expect(App.prototype.render.calledOnce).to.equal(true);
    });

    it('has a header', () => {
        expect(renderApp().find('#header-container').exists()).to.be.true;
    });

    it('has a search container', () => {
        expect(renderApp().find('.searchContainer').exists()).to.be.true;
    });

    it('renders the main section', () => {
        expect(renderApp().find('.main').exists()).to.be.true;
    });
});
