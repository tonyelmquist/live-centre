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
        const header = renderApp().find('AppBar');
        expect(header.length).to.equal(1);
    });

    it('has a main frame', ()=> {
        const mainframe = renderApp().find('MainFrame');
        expect(mainframe.length).to.equal(1);
    });

    it('has a bottom navigation', ()=> {
        const navBotom = renderApp().find('BottomNavMenu');
        expect(navBotom.length).to.equal(1);
    });

});
