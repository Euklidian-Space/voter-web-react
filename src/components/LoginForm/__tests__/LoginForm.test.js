import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { shallowWithStore, mockStore, shallowNoStore } from '../../../testing_utils/mounts';
import { mount } from 'enzyme';
import LoginForm, { LoginForm as NoStoreLoginForm } from '../LoginForm';
import { login } from '../../../actions/session';

let store;
let wrapper;
describe("LoginForm", () => {

	afterEach(() => { store = null; wrapper = null });

	it("should render without crashing", () => {
		store = mockStore({
			session: { errors: { login_errs: {"detail": null} } }
		});
		wrapper = shallowWithStore(<LoginForm />, store);
		expect(wrapper).toBeTruthy();
	});

	describe("Form component", () => {

		it("should exist", () => {
			store = mockStore({
				session: { errors: { login_errs: null } }
			});
			wrapper = shallowWithStore(<LoginForm />, store);
			expect(wrapper.dive().find("Form").length).toBe(1);
		});

		it("should have two fields name Email and Password", () => {
			store = mockStore({
				session: { errors: { login_errs: null } }
			});
			wrapper = shallowWithStore(<LoginForm />, store);
			expect(wrapper.dive().find("Form").props().fields.length).toBe(2);
			expect(wrapper.dive().find("Form").props().fields).toEqual(["Email", "Password"]);
		});

		it("should have an onClickHandler", () => {
			store = mockStore({
				session: { errors: { login_errs: null } }
			});
			wrapper = shallowWithStore(<LoginForm />, store);
			expect(wrapper.dive().find("Form").props().onClickHandler).toBeDefined();
		});

	});

	describe("Dialog Box", () => {

		it("should not display if there are no login errors are present in redux state", () => {
			store = mockStore({session: {errors: {login_errs: null}}});
			wrapper = shallowWithStore(<LoginForm />, store);
			expect(wrapper.dive().find(Dialog).props().open).toBe(false);
		});

		it("should display when errors are present in redux state", () => {
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

		describe("Dissmiss Button", () => {
			it("should exist", () => {
				store = mockStore({
					session: {
						errors: {
							login_errs: { detail: "Unauthorized" }
						}
					}
				});
				wrapper = shallowWithStore(<LoginForm />, store);
				let dialog = wrapper.dive().find("Dialog");
				expect(dialog.props().actions[0].props.label).toBe("Dismiss");
			});

			it("should have text saying: Incorrect email or password.", () => {
				store = mockStore({
					session: {
						errors: {
							login_errs: { detail: "Unauthorized" }
						}
					}
				});
				wrapper = shallowWithStore(<LoginForm />, store);
				let dialog = wrapper.dive().find("Dialog");
				expect(dialog.children().get(0)).toBe("Incorrect email or password");
			});

		});

	});

});
