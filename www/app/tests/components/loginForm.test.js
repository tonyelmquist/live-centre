import {enzymeMount, expect} from '../tests.helper.js';
import LoginForm from '../../scripts/components/LoginForm';


describe('Login Form', () => {
    let wrapper;


    it('renders LoginForm', () => {
        wrapper = enzymeMount(LoginForm);
        expect(wrapper.find('#loginForm').exists()).to.be.true;
    });

});
