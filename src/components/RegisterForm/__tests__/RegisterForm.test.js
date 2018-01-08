import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import RegisterForm from '../RegisterForm';
import { shallowWithStore, mockStore } from '../../../testing_utils/mounts';

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
	store = mockStore({
		session: { errors: { registration_errs: null } }
	});
	let wrapper;

	beforeEach(() => {
		wrapper = shallowWithStore(<RegisterForm />, store);
	});

	it("should render without crashing", () => {
		expect(wrapper).toBeDefined();
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

});
