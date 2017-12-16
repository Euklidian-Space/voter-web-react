import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import LoginForm from '../LoginForm';
import { login } from '../../../actions/session';

describe("LoginForm", () => {
	const wrapper = shallow(<LoginForm />);
	it("should render without crashing", () => {
		expect(wrapper).toBeTruthy();
	});
});
