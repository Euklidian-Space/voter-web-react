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
		session: { errors: { login_errs: {"detail": null} } }
	});
	let wrapper;

	beforeEach(() => {
		wrapper = shallowWithStore(<LoginForm />, store);
	});

	it("should render without crashing", () => {
		expect(wrapper).toBeTruthy();
	});

	it("should not display a dialog box if no login errors are present in redux state", () => {
		expect(wrapper.dive().find(Dialog).props().open).toBe(false);
	});

	it("should display a dialog box when errors are present in redux state", () => {
		store = mockStore({
			session: {
				errors: {
					login_errs: { detail: "Unauthorized" }
				}
			}
		});

		wrapper = shallowWithStore(<LoginForm />, store);

		expect(wrapper.dive().find(Dialog).props().open).toBe(true);
	});


});
