import {enzymeMount, expect} from '../tests.helper.js';
import App from '../../scripts/containers/App';
import sinon from 'sinon';

describe('App',() => {
    let appWraper; //Enzyme react wrapper around App component

    //Function that renders app
    const renderApp = () => {
        if(!appWraper){
            appWraper = enzymeMount(App);
        };
        return appWraper;
    };

    beforeEach(() => {
        appWraper = undefined;
    });

    it('renders App', ()=> {
        expect(renderApp().find('App').exists()).to.be.true;
    });

    it('calls render method once', ()=> {
        sinon.spy(App.prototype, 'render');
        const app = renderApp();
        expect(App.prototype.render.calledOnce).to.equal(true);
    });

    it('has a header', ()=> {
        expect(renderApp().find('#header').exists()).to.be.true;
    });

    it('has a login dialog', ()=> {
        const mainframe = renderApp().find('Login');
        expect(mainframe.length).to.equal(1);
    });


});
