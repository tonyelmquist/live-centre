import { enzymeMount, expect } from '../tests.helper.js';
import RegistrationForm from '../../scripts/components/RegistrationForm';


describe('Registration Form', () => {
    let wrapper;


    it('renders RegistrationForm', () => {
        wrapper = enzymeMount(RegistrationForm);
        expect(wrapper.find('#registrationForm').exists()).to.be.true;
    });


    it('renders fields', () => {
        wrapper = enzymeMount(RegistrationForm);
        expect(wrapper.find('TextField').exists()).to.be.true;
    });
});
