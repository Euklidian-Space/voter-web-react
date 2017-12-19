import React from 'react';
import { shallow } from 'enzyme';
import configureMockstore from 'redux-mock-store';
import thunk from 'redux-thunk'
import renderer from 'react-test-renderer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import RegisterForm from '../RegisterForm';

const mockStore = configureMockstore([thunk]);

const shallowWithStore = (component, store) => {
	const context = {
		store
	};
	return shallow(component, { context });
};

const mockResponse = (status, statusText, response, token) => {
	return new window.Response(response, {
		status,
		statusText,
		headers: {
			'Content-type': 'application/json',
			'Accept': 'application/json',
			'Authorization': `Bearer: ${token}`
		}
	});
}

let store;

describe("RegisterForm", () => {
	// let _name, _username, _email, _password;
	store = mockStore({
		session: { errors: { registration_errs: null } }
	});
	// const registerMock = jest.fn().mockImplementation(({ name, username, email, password }) => {
	// 	_name = name;
	// 	_username = username;
	// 	_email = email;
	// 	_password = password;
	// });
	let wrapper;
	// const raisedBtn = wrapper.find(RaisedButton).first();

	beforeEach(() => {
		// _name = null; _username = null; _email = null; _password = null;
		wrapper = shallowWithStore(<RegisterForm />, store);
	});

	it("should render without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	it("should contain 4 TextFields", () => {
		expect(wrapper.dive().find(TextField).length).toBe(4);
	});

	it("has TextFields that have floatingLabelText in ['Name', 'Username', 'Email', 'Password']", () => {
		const floatingLabelTexts = wrapper.dive().find(TextField).map(node => node.props().floatingLabelText);
		expect(floatingLabelTexts).toEqual(["Name", "Username", "Email", "Password"]);
	});

	it("should have 1 RaisedButton with label = 'Register'", () => {
		const raisedBtns = wrapper.dive().find(RaisedButton);
		expect(raisedBtns.length).toBe(1);
		expect(raisedBtns.first().props().label).toBe("Register");
	});

	it("should display errors that are present in redux state", () => {
		store = mockStore({
			session: {
				errors: {
					registration_errs: {
						"email": "can't be blank",
						"password_hash": "can't be blank"
					}
				}
			}
		});
		wrapper = shallowWithStore(<RegisterForm />, store);

		wrapper.dive().find(TextField).forEach(tf => {
			if (tf.props().floatingLabelText === "Password" || tf.props().floatingLabelText === "email") {
				expect(tf.props().errorText).toBe("can't be blank");
			}
		});
	});


	xdescribe("RaisedButton", () => {

		it("should pass the data in TextFields to its click handler", () => {
			const raisedBtn = wrapper.dive().find(RaisedButton).first();

		  wrapper.dive().find(TextField).forEach(tf => {
				switch (tf.props().floatingLabelText) {
					case "Email":
						tf.simulate("change", { target: { value: "john@doe.com" } });
						break;
					case "Password":
						tf.simulate("change", { target: { value: "password1234" } });
						break;
					case "Name":
						tf.simulate("change", { target: { value: "john doe" } });
						break;
					case "Username":
						tf.simulate("change", { target: { value: "johnny5" } });
						break;
				}
			});

			raisedBtn.simulate("click");
			// expect(registerMock.mock.calls.length).toBe(1);
			expect([_email, _password, _name, _username])
				.toEqual(["john@doe.com", "password1234", "john doe", "johnny5"]);
		});
	});

	xdescribe("TextField", () => {
		it("should display error text when data is invalid", () => {
			let passwordField, emailField;
			store = {
				errors: {
					registration_errs: null
				}
			};
			let response = {
				errors: {
					"email": ["can't be blank"],
					"credential": {
						"password_hash": ["can't be blank"]
					}
				}
			};
			const regComponent = shallowWithStore(<RegisterForm btnHandler={ registerMock }/>, store);
			window.fetch = jest.fn().mockImplementation(() => {
				return Promise.resolve(mockResponse(200, null, JSON.stringify(response), token));
			});

		  regComponent.find(TextField).forEach(tf => {
				switch (tf.props().floatingLabelText) {
					case "Email":
						emailField = tf;
						tf.simulate("change", { target: { value: "" } });
						break;
					case "Password":
						passwordField = tf;
						tf.simulate("change", { target: { value: null } });
						break;
					case "Name":
						tf.simulate("change", { target: { value: "john doe" } });
						break;
					case "Username":
						tf.simulate("change", { target: { value: "johnny5" } });
						break;
				}
			});

			raisedBtn.simulate("click");
			expect([passwordField.props().errorText, emailField.props().errorText])
				.toEqual(["cannot be blank", "cannot be blank"])
		});
	});

});
