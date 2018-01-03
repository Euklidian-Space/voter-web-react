import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { shallowWithStore, mockStore } from '../../../testing_utils/fakeStore';

import LoginForm from '../LoginForm';
import { login } from '../../../actions/session';

let store;

describe("LoginForm", () => {
	store = mockStore({
		session: { errors: { login_errs: null } }
	});
	let wrapper;

	beforeEach(() => {
		wrapper = shallowWithStore(<LoginForm />, store);
	});

	it("should render without crashing", () => {
		expect(wrapper).toBeTruthy();
	});

	xit("should display a dialog box when errors are present in redux state", () => {
		store = mockStore({
			session: {
				errors: {
					login_errs: "Unauthorized"
				}
			}
		});

		wrapper = shallowWithStore(<LoginForm />, store);

		expect(wrapper.find(Dialog).length).toBe(1);
	});

	xit("should not display a dialog box if no login errors are present in redux state", () => {

		wrapper = shallowWithStore(<LoginForm />, store);

		expect(wrapper.find(Dialog).length).toBe(0);
	});

	xit("should display errors that are present in redux state", () => {
		store = mockStore({
			session: {
				errors: {
					login_errs: {
						"email": "can't be blank",
						"password_hash": "can't be blank"
					}
				}
			}
		});
		wrapper = shallowWithStore(<LoginForm />, store);

		wrapper.dive().find(TextField).forEach(tf => {
			if (tf.props().floatingLabelText === "Password" || tf.props().floatingLabelText === "email") {
				expect(tf.props().errorText).toBe("can't be blank");
			}
		});
	});
});
