
import React from 'react';
import { mount } from 'enzyme';
import ConnectedApp, { App } from '../App';
import { shallowWithStore, mockStore, mountWithStore, shallowNoStore } from '../../../testing_utils/mounts';
import realStore from '../../../testing_utils/integration_store';
import reducers from '../../../reducers';
import { initialState as sessionState } from '../../../reducers/session/session';


let store, wrapper;

it('renders without crashing', () => {
	store = mockStore({session: sessionState});
	wrapper = shallowWithStore(<ConnectedApp />, store);

	expect(wrapper).toBeDefined();
});

describe("FlatButton", () => {
	let flatButton;
	beforeEach(() => {
		store = mockStore({ session: sessionState });
		let context = { store };
		wrapper = mount(<ConnectedApp />, { context });
		flatButton = wrapper.find("FlatButton").first();
	});

	it("should exist if willRegister is false", () => {
		expect(flatButton).toBeDefined();
	});

	it("should be a secondary FlatButton", () => {
		expect(flatButton.props().secondary).toBe(true);
	});

	it("should be named Register", () => {
		expect(flatButton.props().label).toBe("Register");
	});

	it("should not exist if willRegister is true", () => {
		store = mockStore({ session: { ...sessionState, willRegister: true } });
		let context = { store };
		wrapper = mount(<ConnectedApp />, { context });
		let flatButtons = wrapper.find("FlatButton");
		expect(flatButtons.length).toBe(0);
	});

	it("should call this.props.registerRequest when clicked", () => {
		const func = jest.fn();
		wrapper = shallowNoStore(<App registerRequest={func} />);
		wrapper.find("FlatButton").simulate("click");
		expect(func).toHaveBeenCalled();
	});
});

describe("Login component", () => {

	it("exists when willRegister is false", () => {
		store = mockStore({session: sessionState});
		let context = { store };
		wrapper = mount(<ConnectedApp />, { context });
		expect(wrapper.find("LoginForm").length).toBe(1);
	});

	it("does not exists when willRegister is true", () => {
		store = mockStore({
			session: { ...sessionState, willRegister: true }
		});
		let context = { store };
		wrapper = mount(<ConnectedApp />, { context });
		expect(wrapper.find("LoginForm").length).toBe(0);
	});

});

describe("Register component", () => {

	it("should exist when this.state.willRegister is true", () => {
		store = mockStore({
			session: { ...sessionState, willRegister: true }
		});
		let context = { store };
		wrapper = mount(<ConnectedApp />, { context });
		expect(wrapper.find("RegisterForm").length).toBe(1);
	});

	it("should not exist when this.state.willRegister is false", () => {
		store = mockStore({
			session: sessionState
		});
		let context = { store };
		wrapper = mount(<ConnectedApp />, { context });
		expect(wrapper.find("RegisterForm").length).toBe(0);
	});
});
