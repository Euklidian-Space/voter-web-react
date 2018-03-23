import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { shallowWithStore, mockStore, shallowNoStore } from '../../../testing_utils/mounts';
// import ConnectedDashboard, { Dashboard } from '../Dashboard';
import Dashboard from '../Dashboard';
import { initialState as sessionState } from '../../../reducers/session/session';

let store, wrapper;

const MockComponent = ({ message }) => {
	return (
		<div>
			I am number { message }
		</div>
	);
}

describe("Dashboard", () => {
	// beforeEach(() => {
	// 	const currentUser = { name: "john", username: "johhny5" };
	// 	store = mockStore({
	// 		session: { ...sessionState, currentUser }
	// 	});
	// });

	it("should render <div>No grids given</div> if grids is undefined or null", () => {
		wrapper = shallowNoStore(<Dashboard />);
		expect(wrapper.html()).toBe("<div>No grids given</div>");
		wrapper = shallowNoStore(<Dashboard grids={() => null} />);
		expect(wrapper.html()).toBe("<div>No grids given</div>");
	});

	it("should display given welcomeMessage", () => {
		// const regex = /\bWelcome,\b.+(?=\bjohn\b)/;
		wrapper = shallowNoStore(<Dashboard welcomeMessage="Welcome, john" grids={() => []}/>);
		// expect(wrapper.html()).toEqual(expect.stringMatching(regex));
		expect(wrapper.html()).toEqual(expect.stringContaining("Welcome, john"));
	});

	describe("GridList", () => {
		let grids, gl;
		beforeEach(() => {
			grids = () => [<MockComponent key="mc1" message="1"/>, <MockComponent key="mc2" message="2"/>];
			wrapper = shallowNoStore(<Dashboard grids={grids} />);
			gl = wrapper.dive().find("GridList").first();
		});

		it("should exist and be the only one", () => {
			expect(wrapper.dive().find("GridList").length).toBe(1);
		});

		it("should display components returned by grids() as children", () => {
			expect(gl.children().find("MockComponent").length).toBe(2);
		});

		it("should spread gridListProps given to Dashboard comp", () => {
			const gridListProps = {
				cols: 2,
				cellHeight: 200,
				padding: 1
			}
			const props = { grids, gridListProps };

			wrapper = shallowNoStore(<Dashboard {...props} />);
			gl = wrapper.dive().find("GridList").first();
			expect(gl.props()).toMatchObject(gridListProps);
		});
	});

});

describe("Create Poll FlatButton", () => {
	// beforeEach(() => {
	// 	const currentUser = { name: "john", username: "johhny5" };
	// 	store = mockStore({
	// 		session: { ...sessionState, currentUser }
	// 	});
	// });

	it("should have a label: 'Create Poll'", () => {
		wrapper = shallowNoStore(<Dashboard />);
		const cp = wrapper.find("FlatButton")
			.filterWhere(n => n.props().label === "Create Poll");
		expect(cp.length).toBe(1);
	});

	xit("should call this.props.createPoll when clicked", () => {
		const func = jest.fn();
		wrapper = shallowNoStore(<Dashboard createPoll={func} />);
		const cp = wrapper.find("FlatButton")
			.filterWhere(n => n.props().label === "Create Poll");
		cp.simulate("click");
		expect(func).toHaveBeenCalled();
	});
});
