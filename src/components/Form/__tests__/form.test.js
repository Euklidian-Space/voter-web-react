
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Form from '../';
import { shallowNoStore, mockStore } from '../../../testing_utils/mounts';

describe("Form", () => {
	let store, wrapper;

	beforeEach(() => {
		store = mockStore({});
		wrapper = shallowNoStore(<Form fields={ [] }/>);
	});

	it("should render without crashing", () => {
		expect(wrapper).toBeDefined();
	});

	it("should render n textFields for n length of fields property", () => {
		wrapper = shallowNoStore(<Form fields={["field1", "field2"]} />);
		expect(wrapper.find(TextField).length).toBe(2);
	});

	it("should render TextFields with floating floatingLabelText corresponding to fields property emebers", () => {
		wrapper = shallowNoStore(<Form fields={ ["field1", "field2"] } />);
		let fieldNames = wrapper.find(TextField).map(tf => tf.props().floatingLabelText);
		expect(fieldNames).toEqual(["field1", "field2"]);
	});

	it("should have hintText in the form of 'fieldName field'", () => {
		wrapper = shallowNoStore(<Form fields={ ["field1"] } />);
		expect(wrapper.find(TextField).first().props().hintText).toBe("field1 field");
	});

	it("should render errors in corresponding TextFields if passed from parent", () => {
		const fields = ["field1", "field2", "field3"];
		const errors = { field1: "err msg", field3: "err msg"};
		const props = { fields, errors };
		wrapper = shallowNoStore(<Form { ...props } />);
		const expected = [["field1", "err msg"], ["field3", "err msg"]];

		expect(wrapper.find(TextField).map(tf => [tf.props().floatingLabelText, tf.props().errorText])
			.filter(p => p[1]))
			.toEqual(expected);
	});

	describe("RaisedButton", () => {
		it("should exist", () => {
			expect(wrapper.find(RaisedButton).length).toBe(1);
		});

		it("should have a label property equal to 'Submit'", () => {
			expect(wrapper.find(RaisedButton).first().props().label).toBe("Submit");
		});

		it("should call onClickHandler passing data from text fields as arguments", () => {
			const fields = ["field1", "field2", "field3"];
			const onClickHandler = jest.fn();
			const props = { fields, onClickHandler };
			wrapper = shallowNoStore(<Form { ...props } />);
			const raisedBtn = wrapper.find(RaisedButton).first();

		  wrapper.find(TextField).forEach(tf => {
				switch (tf.props().floatingLabelText) {
					case "field1":
						tf.simulate("change", { target: { value: "john@doe.com" } });
						break;
					case "field2":
						tf.simulate("change", { target: { value: "password1234" } });
						break;
					case "field3":
						tf.simulate("change", { target: { value: "john doe" } });
						break;
				}
			});

			let arg = {
				field1: "john@doe.com",
				field2: "password1234",
				field3: "john doe"
			};

			raisedBtn.simulate("click");
			expect(onClickHandler).toHaveBeenCalledWith(arg);
		});
	});
});
