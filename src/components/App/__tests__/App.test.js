
import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from '../App';

import LogIn from '../../LoginForm/Login.js';
import RegisterForm from '../../RegisterForm/RegisterForm';
import { shallowWithStore, mockStore } from '../../../testing_utils/fakeStore';


let store, wrapper;

beforeEach(() => {
	store = mockStore({});
	wrapper = shallowWithStore(<App />, store);
});

it('renders without crashing', () => {
	expect(wrapper).toBeTruthy();
});



xdescribe("Login component", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<App />);
	});
	it("exists when this.state.willRegister is false", () => {
		expect(wrapper.find(LogIn).length).toBe(1);
	});

	it("does not exists when this.state.willRegister is true", () => {
		wrapper.setState({ willRegister: true });
		expect(wrapper.find(LogIn).length).toBe(0);
	});

	it("is given the login action via passed props", () => {
		/*
			integration test
		*/
		expect(wrapper.find(LogIn).first().props().btnAction).toBeDefined();
	});
});

xdescribe("Register component", () => {
	let wrapper;
	beforeEach(() => wrapper = shallow(<App />));

	it("should exist when this.state.willRegister is true", () => {
		expect(wrapper.find(RegisterForm).length).toBe(1);
	});

	it("should not exist when this.state.willRegister is false", () => {
		expect(wrapper.find(RegisterForm).length).toBe(0);
	});
});
