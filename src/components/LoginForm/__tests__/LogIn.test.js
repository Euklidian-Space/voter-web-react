
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import LogIn from '../LogIn';
import { login } from '../../../actions/session';

describe("LogIn", () => {
	const wrapper = shallow(<LogIn btnAction={ login }/>);

	it("exists", () => {
		expect(wrapper).toBeTruthy();
	});

	describe("TextFields", () => {
		it("has 2 TextFields", () => {
			expect(wrapper.find(TextField).length).toBe(2);
		});

		it("has a TextField with floatingLabelText = Email", () => {
			expect(wrapper.find(TextField).first().props().floatingLabelText).toBe("Email");
		});

		it("has a TextField with floatingLabelText = Password", () => {
			let textFields = wrapper.find(TextField);
			let count = 0;

			textFields.forEach(tf => {
				if (tf.props().floatingLabelText === "Password") count += 1;
			});

			expect(count).toBe(1);
		});
	});

	describe("Log In button", () => {
		let called = false;
		const login_mock = jest.fn().mockImplementation(() => {
			called = true;
		});
		const wrapper = shallow(<LogIn btnAction={ login_mock }/>);
		const loginButton = wrapper.find(RaisedButton).first();

		it("exists", () => {
			expect(wrapper.findWhere(n => n.props().label === "Log In").length).toBe(1);
		});

		it("has a label property = 'Log In'", () => {
			expect(loginButton.props().label).toBe("Log In");
		});

		it("should call btnAction prop when clicked", () => {
			loginButton.simulate('click');
			expect(called).toBe(true);
		});

		describe("btnAction", () => {
			let email, password;
			const login_mock = jest.fn().mockImplementation((_email, _password) => {
				email = _email;
				password = _password
			});

			const wrapper = shallow(<LogIn btnAction={ login_mock } />);
			const loginButton = wrapper.find(RaisedButton).first();

			beforeEach(() => {
			  wrapper.find(TextField).forEach(tf => {
					switch (tf.props().floatingLabelText) {
						case "Email":
							tf.simulate("change", { target: { value: "john@doe.com" } });
							break;
						case "Password":
							tf.simulate("change", { target: { value: "password1234" } });
							break;
					}
				});
			})

			it("should receive email and password data from TextField components when RaisedButton is clicked", () => {
				loginButton.simulate("click");
				expect(email).toBe("john@doe.com");
				expect(password).toBe("password1234");
			});
		});

	});

	describe("Register button", () => {
		const login_mock = jest.fn().mockImplementation(() => undefined);
		const wrapper = shallow(<LogIn btnAction={ login_mock }/>);
		const RegisterBtn = wrapper.findWhere(n => n.props().label === "Register").first();

		it("should exist", () => {
			expect(RegisterBtn).toBeDefined();
		});

		describe("Register button action", () => {

		});

	});

});
